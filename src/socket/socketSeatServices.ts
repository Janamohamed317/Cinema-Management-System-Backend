import { prisma } from "../prismaClient/client";
import { BadRequestError } from "../utils/error";

export async function getScreeningSnapshot(screeningId: string) {
    const tickets = await prisma.ticket.findMany({
        where: { screeningId, deletedAt: null },
        select: { seatId: true },
    });
    const now = new Date();
    const heldSeats = await prisma.seatHold.findMany({
        where: {
            screeningId,
            expiresAt: { gt: now },
        },
        select: { seatId: true },
    });

    return {
        screeningId,
        bookedSeats: tickets.map(t => t.seatId),
        heldSeats: heldSeats.map(h => h.seatId),
    };
}

export const holdSeatWithCheck = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.$transaction(async (tx) => {
        const held = await tx.seatHold.findFirst({ where: { screeningId, seatId } });

        if (held) {
            throw new BadRequestError('SEAT_HELD');
        }

        const booked = await tx.ticket.findFirst({ where: { screeningId, seatId, deletedAt: null } });

        if (booked) {
            throw new BadRequestError('SEAT_BOOKED');
        }

        return await tx.seatHold.create({
            data: {
                screeningId,
                seatId,
                userId,
                expiresAt: new Date(Date.now() + 2.5 * 60 * 1000)
            }
        });
    });
};;

export const manualSeatRelease = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.seatHold.deleteMany({ where: { screeningId, seatId, userId } })
}

export const cleanupExpiredHolds = async () => {
    const now = new Date();
    const expired = await prisma.seatHold.findMany({
        where: { expiresAt: { lt: now } },
        select: { screeningId: true, seatId: true },
    });

    if (expired.length === 0) return [];

    await prisma.seatHold.deleteMany({
        where: { expiresAt: { lt: now } },
    });

    return expired;
}

export const deleteHeldSeatsForUser = async (userId: string) => {
    return await prisma.seatHold.deleteMany({ where: { userId } })
}

export const getHeldSeatsForUser = async (userId: string) => {
    return await prisma.seatHold.findMany({ where: { userId }, select: { screeningId: true, seatId: true } })
}