import { Decimal } from "@prisma/client/runtime/library";
import { PaymentData } from "./transaction";

export type TicketWithDetails = {
    user: {
        email: string;
        username: string;
    }
    screening: {
        startTime: Date;
        movie: {
            name: string;
        }
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
    seatIDs: string[]
}

export type TicketReservationRequest = {
    ticketData: TicketAddingBody
    paymentData: PaymentData
}