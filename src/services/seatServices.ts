import { Seat, SeatStatus, TicketStatus } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { SeatAddingBody, SeatEditingBody } from "../types/seat"
import { TicketWithUserAndScreening } from "../types/ticket"
import { NotFoundError, BadRequestError, ConflictError } from "../utils/error"
import { validateAddingSeat, validateSeatId, validateEditingSeat } from "../utils/validations/seatValidation"
import { findHallById } from "./hallServices"

export const findSeatBySeatNumber = async (seatNumber: number, hallId: string): Promise<Seat | null> => {
    return await prisma.seat.findFirst({ where: { seatNumber, hallId } })
}

export const findSeatById = async (id: string): Promise<Seat | null> => {
    return await prisma.seat.findFirst({ where: { id } })
}

export const addSeatService = async (data: SeatAddingBody) => {
    const { error } = validateAddingSeat(data)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const { seatNumber, hallId } = data

    const foundSeat = await findSeatBySeatNumber(seatNumber, hallId)
    if (foundSeat) {
        const isDeleted = isSeatDeleted(foundSeat)
        if (!isDeleted) {
            throw new ConflictError("Seat with the Same Number Already Exists in This Hall")
        }
        throw new ConflictError(`Seat ${seatNumber} in this hall exists but is deleted. Please restore it instead of creating a new one.`)
    }

    const foundHall = await findHallById(hallId)
    if (!foundHall) {
        throw new NotFoundError("The Hall You Are Trying to Assign to is Not Found")
    }

    return await prisma.seat.create({ data })
}

export const softDeleteSeatService = async (id: string) => {
    const { error } = validateSeatId(id)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

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

    if (result.count === 0) {
        throw new NotFoundError("Seat Not Found")
    }

    if (futureTickets.length > 0) {
        await sendRefundEmail(futureTickets)
    }
}

export const editSeatService = async (id: string, data: SeatEditingBody) => {
    const { error: idError } = validateSeatId(id)
    if (idError) {
        throw new BadRequestError(idError.details[0].message)
    }

    const { error } = validateEditingSeat(data)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    if (data.status === SeatStatus.PERMANENTLY_REMOVED) {
        throw new BadRequestError("Cannot set status to PERMANENTLY_REMOVED. Use delete endpoint instead.")
    }

    const result = await prisma.seat.updateMany({
        where: { id, deletedAt: null },
        data,
    })

    if (result.count === 0) {
        throw new NotFoundError("Seat not found or deleted")
    }

    if (data.status === SeatStatus.UNDER_MAINTENANCE) {
        return await checkAssignedTickets(id)
    }

    return null
}

export const restoreSeatService = async (id: string) => {
    const { error } = validateSeatId(id)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const result = await prisma.seat.updateMany({
        where: { id, deletedAt: { not: null } },
        data: { deletedAt: null, status: "ACTIVE" },
    })

    if (result.count === 0) {
        throw new NotFoundError("Seat Not Found")
    }
}

export const getAvailableSeats = async (screeningId: string) => {
    const screening = await prisma.screening.findUnique({
        where: { id: screeningId, deletedAt: null }
    })

    if (!screening) {
        throw new NotFoundError("Screening not found")
    }

    return await prisma.seat.findMany({
        where: {
            hallId: screening.hallId,
            deletedAt: null,
            status: SeatStatus.ACTIVE,
            tickets: {
                none: {
                    screeningId: screeningId,
                    deletedAt: null,
                    status: TicketStatus.PAID
                }
            }
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
    }
}