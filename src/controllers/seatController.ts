import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SeatAddingBody, SeatEditingBody } from "../types/seat";
import { validateAddingSeat, validateSeatId, validateEditingSeat } from "../utils/validations/seatValidation";
import { findSeatBySeatNumber, addSeatService, softDeleteSeatById, editSeatById, restoreSeatById, getAllActiveSeats, isSeatDeleted, checkAssignedTickets }
    from "../services/seatServices";
import { findHallById } from "../services/hallServices";
import { SeatStatus } from "@prisma/client";


export const addSeat = asyncHandler(async (req: Request<{}, {}, SeatAddingBody>, res: Response) => {
    const { error } = validateAddingSeat(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { seatNumber, hallId } = req.body

    const foundSeat = await findSeatBySeatNumber(seatNumber, hallId)
    if (foundSeat) {
        const isDeleted = isSeatDeleted(foundSeat)
        if (!isDeleted) {
            res.status(409).json({ message: "Seat with the Same Number Already Exists in This Hall" })
            return
        }

        res.status(409).json({
            message: `Seat ${seatNumber} in this hall exists but is deleted. Please restore it instead of creating a new one.`,
        })
        return
    }

    const foundHall = await findHallById(hallId)
    if (!foundHall) {
        res.status(404).json({ message: "The Hall You Are Trying to Assign to is Not Found" })
        return
    }

    await addSeatService(req.body)

    res.status(201).json({
        message: `Seat ${seatNumber} Created Successfully`,
    })
    return
})

export const deleteSeat = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateSeatId(req.params.id)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params

    const result = await softDeleteSeatById(id)

    if (result.count === 0) {
        res.status(404).json({ message: "Seat Not Found" })
        return
    }

    res.status(200).json({ message: "Deleted successfully" })
    return
})

export const editSeat = asyncHandler(async (req: Request<{ id: string }, {}, SeatEditingBody>, res: Response) => {
    const { error: idError } = validateSeatId(req.params.id)

    if (idError) {
        res.status(400).json({ message: idError.details[0].message })
        return
    }

    const { error } = validateEditingSeat(req.body)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params

    if (req.body.status === 'PERMANENTLY_REMOVED') {
        res.status(400).json({ message: "Cannot set status to PERMANENTLY_REMOVED. Use delete endpoint instead." })
        return
    }


    const result = await editSeatById(id, req.body)

    if (result.count === 0) {
        res.status(404).json({ message: "Seat not found or deleted" })
        return
    }

    if (req.body.status === SeatStatus.UNDER_MAINTENANCE) {
        const tickets = await checkAssignedTickets(id)
        res.status(200).json({ tickets })
        return
    }
    res.status(200).json({ message: "Seat updated successfully" })
    return
})

export const restoreSeat = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateSeatId(req.params.id)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params

    const result = await restoreSeatById(id)

    if (result.count === 0) {
        res.status(404).json({ message: "Seat Not Found" })
        return
    }

    res.status(200).json({ message: "Seat Restored Successfully" })
    return
})

export const getAllSeats = asyncHandler(async (req: Request, res: Response) => {
    const seats = await getAllActiveSeats()
    res.status(200).json(seats)
    return
})
