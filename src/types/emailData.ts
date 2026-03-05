export type VerificationEmailData = {
    otp: string,
    username: string
}

export type TicketCancellationEmailData = {
    email: string;
    username: string;
    movieTitle: string;
    date: string;
    time: string;
    hallName: string;
    seats: string[];
    refundAmount: number;
}
