import { Seat, SeatStatus, TicketStatus } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { SeatAddingBody, SeatEditingBody } from "../types/seat"
import { TicketWithUserAndScreening } from "../types/ticket"

export const findSeatBySeatNumber = async (seatNumber: number, hallId: string) => {
    const seat = await prisma.seat.findFirst({
        where: {
            seatNumber,
            hallId
        },
    })

    if (seat) {
        return seat
    }

    return null
}

export const findSeatById = async (id: string) => {
    const seat = await prisma.seat.findFirst({
        where: { id },
    })

    if (seat) {
        return seat
    }

    return null
}

export const addSeatService = async (data: SeatAddingBody) => {
    return await prisma.seat.create({
        data,
    })
}

export const softDeleteSeatById = async (id: string) => {
    const futureTickets = await checkAssignedTickets(id)
    const result = await prisma.$transaction(async (transaction) => {
        const updatedSeats = await transaction.seat.updateMany({
            where: { id, deletedAt: null },
            data: { deletedAt: new Date(), status: SeatStatus.PERMANENTLY_REMOVED },
        })
        for (const ticket of futureTickets) {
            await transaction.ticket.update({ where: { id: ticket.id }, data: { status: TicketStatus.REFUNDED } })
        }
        return updatedSeats
    })
    if (result.count !== 0 && futureTickets.length > 0) {
        await sendRefundEmail(futureTickets)
    }
    return result
}

export const editSeatById = async (id: string, data: SeatEditingBody) => {
    return await prisma.seat.updateMany({
        where: {
            id,
            deletedAt: null,
        },
        data,
    })
}

export const restoreSeatById = async (id: string) => {
    return await prisma.seat.updateMany({
        where: {
            id,
            deletedAt: { not: null },
        },
        data: {
            deletedAt: null,
            status: "ACTIVE",
        },
    })
}

export const getAllActiveSeats = async () => {
    return await prisma.seat.findMany({
        where: {
            deletedAt: null,
        },
    })
}

export const isSeatDeleted = (seat: Seat): boolean => {
    return seat.deletedAt !== null
}

export const checkAssignedTickets = async (id: string) => {
    return await prisma.ticket.findMany({
        where: { seatId: id, deletedAt: null, screening: { startTime: { gt: new Date() } } },
        include: {
            user: { select: { email: true, username: true } },
            screening: { select: { startTime: true } }
        }
    })
}

export const sendRefundEmail = async (tickets: TicketWithUserAndScreening[]) => {
    for (const ticket of tickets) {
        // send email to user
    }
}