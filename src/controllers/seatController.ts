import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SeatAddingBody, SeatEditingBody } from "../types/seat";
import { addSeatService, softDeleteSeatService, editSeatService, restoreSeatService, getAllActiveSeats } from "../services/seatServices";

export const addSeat = asyncHandler(async (req: Request<{}, {}, SeatAddingBody>, res: Response) => {
    const seat = await addSeatService(req.body)
    res.status(201).json({ message: `Seat ${seat.seatNumber} Created Successfully` })
})

export const deleteSeat = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await softDeleteSeatService(req.params.id)
    res.status(200).json({ message: "Deleted successfully" })
})

export const editSeat = asyncHandler(async (req: Request<{ id: string }, {}, SeatEditingBody>, res: Response) => {
    const tickets = await editSeatService(req.params.id, req.body)
    if (tickets) {
        res.status(200).json({ tickets })
    } else {
        res.status(200).json({ message: "Seat updated successfully" })
    }
})

export const restoreSeat = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await restoreSeatService(req.params.id)
    res.status(200).json({ message: "Seat Restored Successfully" })
})

export const getAllSeats = asyncHandler(async (req: Request, res: Response) => {
    const seats = await getAllActiveSeats()
    res.status(200).json(seats)
})
