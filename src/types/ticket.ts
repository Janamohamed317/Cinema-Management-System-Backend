import { PaymentData } from "./transaction";

export type TicketWithUserAndScreening = {
    user: {
        email: string;
        username: string;
    }
    screening: {
        startTime: Date;
    },
    id: string;
    createdAt: Date;
    deletedAt: Date | null;
    status: string;
    screeningId: string;
    userId: string;
    seatId: string;
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