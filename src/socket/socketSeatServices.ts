import { prisma } from "../prismaClient/client";

export const getHoldSeatSnapshot = async (screeningId: string, seatId: string, userId: string) => {
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    return prisma.seatHold.create({
        data: { screeningId, seatId, userId, expiresAt },
        select: { seatId: true, screeningId: true, userId: true, expiresAt: true },
    });
};

export const manualSeatRelease = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.seatHold.deleteMany({ where: { screeningId, seatId, userId } })
}
