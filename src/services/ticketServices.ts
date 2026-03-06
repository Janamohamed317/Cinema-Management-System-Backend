import { Seat, SeatStatus, Ticket, TicketStatus, TransactionStatus } from "@prisma/client";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../utils/error";
import { prisma } from "../prismaClient/client";
import { getScreeningDetailsById } from "./screeningService";
import { validateTicketReservation, validateTicketId, validateScreeningId } from "../utils/validations/ticketValidation";
import { TicketReservationRequest, TicketWithUserAndScreening } from "../types/ticket";
import { calculateTicketPrice } from "../utils/pricing";
import { validatePayment } from "./transactionServices";
import { Decimal } from "@prisma/client/runtime/library";
import { transporter } from "../utils/mailer";
import { ticketConfirmationEmailTemplate } from "../utils/templates/ticketConfirmationEmailTemplate";
import { ticketCancellationEmailTemplate } from "../utils/templates/ticketCancellationEmailTemplate";
import { TicketCancellationEmailData } from "../types/emailData";

export const reserveTicketService = async (data: TicketReservationRequest, userId: string) => {
    const { error } = validateTicketReservation(data.ticketData);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const screening = await getScreeningDetailsById(data.ticketData.screeningId)
    const price = calculateTicketPrice(screening)
    const totalAmount = data.ticketData.seatIDs.length * price
    const transaction = await prisma.transaction.create({
        data: {
            userId, paymentMethod: data.paymentData.paymentMethod, totalAmount,
            status: TransactionStatus.PENDING
        }
    })

    const ticketIDs: string[] = []
    await prisma.$transaction(async (tx) => {
        const existingTickets = await tx.ticket.findMany({
            where: {
                seatId: { in: data.ticketData.seatIDs }, deletedAt: null, screeningId: data.ticketData.screeningId,
                status: { notIn: [TicketStatus.CANCELLED, TicketStatus.REFUNDED] }
            }
        })
        const seats = await tx.seat.findMany({
            where: {
                id: { in: data.ticketData.seatIDs }, hallId: screening.hallId,
                deletedAt: null, status: SeatStatus.ACTIVE

            }
        })
        checkSeats(existingTickets, seats, data.ticketData.seatIDs.length)

        for (const seatId of data.ticketData.seatIDs) {
            const ticket = await tx.ticket.create({
                data: { screeningId: data.ticketData.screeningId, status: TicketStatus.PENDING, userId, seatId, price, transactionId: transaction.id }
            })
            ticketIDs.push(ticket.id)
        }
    })

    try {
        validatePayment(data.paymentData)
    } catch (error) {
        await prisma.$transaction(async (tx) => {
            await tx.transaction.update({ where: { id: transaction.id }, data: { status: TransactionStatus.REJECTED } })
            await tx.ticket.updateMany({ where: { id: { in: ticketIDs } }, data: { status: TicketStatus.CANCELLED } })
        })
        throw error
    }

    return await prisma.$transaction(async (tx) => {
        await tx.transaction.update({ where: { id: transaction.id }, data: { status: TransactionStatus.COMPLETED } })
        await tx.ticket.updateMany({ where: { id: { in: ticketIDs } }, data: { status: TicketStatus.PAID } })

        const updatedTickets = await tx.ticket.findMany({
            where: { id: { in: ticketIDs } },
            include: {
                user: { select: { email: true, username: true } },
                screening: { select: { startTime: true } },
                seat: { select: { seatNumber: true } }
            }
        })

        return updatedTickets
    })
}

export const cancelAllTicketsForScreeningService = async (screeningId: string, userId: string) => {
    const { error } = validateScreeningId(screeningId);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const tickets = await prisma.ticket.findMany({
        where: { screeningId, userId, deletedAt: null },
        include: {
            screening: { include: { movie: true, hall: true } },
            user: true,
            seat: true
        }
    })

    if (tickets.length === 0) {
        throw new NotFoundError('No tickets found for this screening')
    }

    checkTicketBeforeDeletionService(tickets[0].screening.startTime)

    await prisma.$transaction(async (tx) => {
        await tx.ticket.updateMany({
            where: { screeningId, userId, deletedAt: null },
            data: { deletedAt: new Date(), status: TicketStatus.REFUNDED }
        })

        const transactionUpdates = new Map<string, Decimal>()
        for (const ticket of tickets) {
            const current = transactionUpdates.get(ticket.transactionId) || new Decimal(0)
            transactionUpdates.set(ticket.transactionId, current.add(ticket.price))
        }

        for (const [transactionId, amount] of transactionUpdates) {
            await tx.transaction.update({
                where: { id: transactionId },
                data: { totalAmount: { decrement: amount.toNumber() } }
            })
        }
    })

    const totalRefundAmount = tickets.reduce((sum, ticket) => sum + ticket.price.toNumber(), 0);
    const { startTime } = tickets[0].screening;

    const emailData: TicketCancellationEmailData = {
        email: tickets[0].user.email,
        username: tickets[0].user.username,
        movieTitle: tickets[0].screening.movie.name,
        date: new Date(startTime).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        time: new Date(startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        hallName: tickets[0].screening.hall.name,
        seats: tickets.map(t => t.seat.seatNumber),
        refundAmount: totalRefundAmount
    };

    await sendTicketCancellationEmail(emailData);

    return { cancelledCount: tickets.length }
}

export const cancelTicketService = async (ticketId: string, userId: string) => {
    const { error } = validateTicketId(ticketId);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
            screening: { include: { movie: true, hall: true } },
            user: true,
            seat: true
        }
    })

    if (!ticket || ticket.deletedAt !== null) {
        throw new NotFoundError('Ticket not found')
    }

    if (ticket.userId !== userId) {
        throw new ForbiddenError("You are not authorized to cancel this ticket");
    }

    checkTicketBeforeDeletionService(ticket.screening.startTime)

    await prisma.$transaction(async (tx) => {
        await tx.ticket.update({
            where: { id: ticketId },
            data: { deletedAt: new Date(), status: TicketStatus.REFUNDED }
        })

        await tx.transaction.update({
            where: { id: ticket.transactionId },
            data: { totalAmount: { decrement: ticket.price.toNumber() } }
        })
    })
    
    const { startTime } = ticket.screening;

    const emailData: TicketCancellationEmailData = {
        email: ticket.user.email,
        username: ticket.user.username,
        movieTitle: ticket.screening.movie.name,
        date: new Date(startTime).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        time: new Date(startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        hallName: ticket.screening.hall.name,
        seats: [ticket.seat.seatNumber],
        refundAmount: ticket.price.toNumber()
    };

    await sendTicketCancellationEmail(emailData);
}

export const checkTicketBeforeDeletionService = (startTime: Date) => {
    if (startTime < new Date()) {
        throw new BadRequestError('Cannot cancel ticket for past screening')
    }
}

export const findUserTicketsService = async (userId: string) => {
    return await prisma.ticket.findMany({
        where: { userId, deletedAt: null }, include: {
            screening: { include: { movie: true, hall: true } },
            seat: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

export const checkSeats = (existingTickets: Ticket[], seats: Seat[], reservedSeats: number) => {
    if (existingTickets.length > 0) {
        throw new ConflictError('Some seats are already booked')
    }
    if (seats.length !== reservedSeats) {
        throw new BadRequestError('Some seats are deleted or under maintenance')
    }
}

export const getTicketDetailsService = async (id: string) => {
    const ticket = await prisma.ticket.findFirst({ where: { id, deletedAt: null }, include: { screening: true, seat: true } })
    return ticket
}

export const getScreeningTicketsService = async (id: string) => {
    return await prisma.ticket.findMany({
        where: { screeningId: id, deletedAt: null }, include: { user: { select: { username: true, email: true } }, seat: true }
    })
}

export const sendTicketConfirmationEmail = async (tickets: TicketWithUserAndScreening[]) => {
    const html = ticketConfirmationEmailTemplate(tickets)
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: tickets[0].user.email,
        subject: "Ticket Reservation Confirmation",
        html,
    })
}

export const sendTicketCancellationEmail = async (data: TicketCancellationEmailData) => {
    const html = ticketCancellationEmailTemplate(data);
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: data.email,
        subject: "Ticket Cancellation Confirmation",
        html,
    });
}
