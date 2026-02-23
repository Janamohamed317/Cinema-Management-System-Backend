import { prisma } from "../prismaClient/client";

export async function getScreeningSnapshot(screeningId: string) {
    const tickets = await prisma.ticket.findMany({
        where: { screeningId, deletedAt: null },
        select: { seatId: true },
    });

    return {
        screeningId,
        bookedSeats: tickets.map(t => t.seatId),
        heldSeats: [],
    };
}