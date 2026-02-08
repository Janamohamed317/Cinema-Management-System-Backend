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