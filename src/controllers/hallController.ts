import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { addHallService, softDeleteHallService, editHallService, restoreHallService, getAllActiveHalls } from "../services/hallServices"
import { HallAddingBody, HallEditingBody } from "../types/hall"

export const addHall = asyncHandler(async (req: Request<{}, {}, HallAddingBody>, res: Response) => {
    const hall = await addHallService(req.body)
    res.status(201).json({ message: `Hall ${hall.name} is Created Successfully` })
})

export const deleteHall = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await softDeleteHallService(req.params.id)
    res.status(200).json({ message: "Deleted successfully" })
})

export const editHall = asyncHandler(async (req: Request<{ id: string }, {}, HallEditingBody>, res: Response) => {
    await editHallService(req.params.id, req.body)
    res.status(200).json({ message: "Hall updated successfully" })
})

export const restoreHall = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await restoreHallService(req.params.id)
    res.status(200).json({ message: "Hall Restored Successfully" })
})

export const getAllHalls = asyncHandler(async (req: Request, res: Response) => {
    const halls = await getAllActiveHalls()
    res.status(200).json(halls)
})
