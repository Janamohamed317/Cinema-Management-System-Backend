import { SeatStatus } from "@prisma/client"

export type SeatAddingBody = {
    hallId: string,
    seatNumber: number
}

export type SeatEditingBody = {
    hallId?: string
    status?: SeatStatus
}
