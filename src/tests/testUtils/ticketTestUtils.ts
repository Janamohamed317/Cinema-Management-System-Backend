
import { prisma } from "../../prismaClient/client";
import { TicketStatus } from "@prisma/client";
import { saveTransactionToDb } from "./transactionTestUtils";

export const buildTicketData = async (screeningId: string, seatId: string, userId: string) => {
    const transaction = await saveTransactionToDb(userId)
    return {
        screeningId,
        seatId,
        userId,
        status: TicketStatus.PAID,
        price: 150,
        transactionId: transaction.id
    }
};

export const saveTicketToDb = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.ticket.create({
        data: await buildTicketData(screeningId, seatId, userId)
    });
};
