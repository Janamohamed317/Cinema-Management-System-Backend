import { SeatStatus, TicketStatus } from "@prisma/client";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../utils/error";
import { prisma } from "../prismaClient/client";
import { getScreeningDetailsById } from "./screeningService";
import { validateTicketReservation, validateTicketId, validateScreeningId } from "../utils/validations/ticketValidation";
import { TicketAddingBody } from "../types/ticket";
import { calculateTicketPrice } from "../utils/pricing";

export const reserveTicketService = async (data: TicketAddingBody, userId: string) => {
    const { error } = validateTicketReservation({ ...data, userId });
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const existingTickets = await prisma.ticket.findMany({
        where: { seatId: { in: data.seatIDs }, deletedAt: null, screeningId: data.screeningId }
    })

    const screening = await getScreeningDetailsById(data.screeningId)
    const price = calculateTicketPrice(screening)

    const seats = await prisma.seat.findMany({
        where: {
            id: { in: data.seatIDs },
            hallId: screening.hallId,
            deletedAt: null,
            status: SeatStatus.ACTIVE
        }
    })

    if (existingTickets.length > 0) {
        throw new ConflictError('Some seats are already booked')
    }
    if (seats.length !== data.seatIDs.length) {
        throw new BadRequestError('Some seats are booked, deleted, under maintenance, or not in this hall')
    }

    return await prisma.$transaction(async (tx) => {
        const tickets = []
        for (const seatId of data.seatIDs) {
            const ticket = await tx.ticket.create({
                data: { screeningId: data.screeningId, status: TicketStatus.PAID, userId: userId, seatId: seatId, price }
            })
            tickets.push(ticket)
        }
        return tickets
    })
}

export const cancelAllTicketsForScreeningService = async (screeningId: string, userId: string) => {
    const { error } = validateScreeningId(screeningId);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const tickets = await prisma.ticket.findMany({
        where: { screeningId, userId, deletedAt: null },
        include: { screening: true }
    })

    if (tickets.length === 0) {
        throw new NotFoundError('No tickets found for this screening')
    }

    checkTicketBeforeDeletionService(tickets[0].screening.startTime)

    await prisma.ticket.updateMany({
        where: {
            screeningId,
            userId,
            deletedAt: null
        },
        data: {
            deletedAt: new Date(),
            status: TicketStatus.REFUNDED
        }
    })

    return { cancelledCount: tickets.length }
}

export const cancelTicketService = async (ticketId: string, userId: string) => {
    const { error } = validateTicketId(ticketId);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { screening: true }
    })

    if (!ticket || ticket.deletedAt !== null) {
        throw new NotFoundError('Ticket not found')
    }

    if (ticket.userId !== userId) {
        throw new ForbiddenError("You are not authorized to cancel this ticket");
    }

    checkTicketBeforeDeletionService(ticket.screening.startTime)

    await prisma.ticket.update({
        where: { id: ticketId },
        data: { deletedAt: new Date(), status: TicketStatus.REFUNDED }
    })
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

export const getTicketDetailsService = async (id: string) => {
    const ticket = await prisma.ticket.findFirst({ where: { id, deletedAt: null }, include: { screening: true, seat: true } })
    return ticket
}

export const getScreeningTicketsService = async (id: string) => {
    return await prisma.ticket.findMany({
        where: { screeningId: id, deletedAt: null }, include: { user: { select: { username: true, email: true } }, seat: true }
    })
}