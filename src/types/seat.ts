import { SeatStatus } from "@prisma/client"

export type SeatAddingBody = {
    hallId: string,
    seatNumber: string
}

export type SeatEditingBody = {
    hallId?: string
    status?: SeatStatus
}


export type ReleasedSeat = {
    screeningId: string; seatId: string
};