
import { prisma } from "../../prismaClient/client";
import { TicketStatus } from "@prisma/client";
import { getScreeningDetailsById } from "../../services/screeningService";
import { calculateTicketPrice } from "../../utils/pricing";
import { saveTransactionToDb } from "./transactionTestUtils";

export const buildTicketData = async (screeningId: string, seatId: string, userId: string) => {
    const screeningDetails = await getScreeningDetailsById(screeningId)
    const price = calculateTicketPrice(screeningDetails)
    const transaction = await saveTransactionToDb(userId)
    return {
        screeningId,
        seatId,
        userId,
        status: TicketStatus.PAID,
        price,
        transactionId: transaction.id
    }
};

export const saveTicketToDb = async (screeningId: string, seatId: string, userId: string) => {
    return await prisma.ticket.create({
        data: await buildTicketData(screeningId, seatId, userId)
    });
};
