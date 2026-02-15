import { prisma } from "../../prismaClient/client";
import { TicketStatus } from "@prisma/client";

export const buildTicketData = (screeningId: string, seatId: string, userId: string) => ({
    screeningId,
    seatId,
    userId,
    status: TicketStatus.PAID
});

export const saveTicketToDb = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.ticket.create({
        data: buildTicketData(screeningId, seatId, userId)
    });
};
