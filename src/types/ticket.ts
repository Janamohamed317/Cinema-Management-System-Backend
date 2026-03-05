import { Decimal } from "@prisma/client/runtime/library";
import { PaymentData } from "./transaction";

export type TicketWithUserAndScreening = {
    user: {
        email: string;
        username: string;
    }
    screening: {
        startTime: Date;
    }
    seat: {
        seatNumber: string;
    }
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    status: string;
    screeningId: string;
    userId: string;
    seatId: string;
    price: Decimal;
    transactionId: string;
}

export type TicketAddingBody = {
    screeningId: string
    userId: string
    seatIDs: string[]
}

export type TicketReservationRequest = {
    ticketData: TicketAddingBody
    paymentData: PaymentData
}