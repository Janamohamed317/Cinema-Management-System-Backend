import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ScreeningAddingBody, ScreeningEditingBody } from "../types/screening";
import { createScreeningService, editScreeningService, softDeleteScreeningService, restoreScreeningService, getAllScreeningsService, getScreeningDetailsById } from "../services/screeningService";

export const addScreening = asyncHandler(async (req: Request<{}, {}, ScreeningAddingBody>, res: Response) => {
    await createScreeningService(req.body)
    res.status(201).json({ message: "added" })
})

export const deleteScreening = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await softDeleteScreeningService(req.params.id)
    res.status(200).json({ message: "Deleted Successfully" })
})

export const restoreScreening = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await restoreScreeningService(req.params.id)
    res.status(200).json({ message: "restored Successfully" })
})

export const editScreening = asyncHandler(async (req: Request<{ id: string }, {}, ScreeningEditingBody>, res: Response) => {
    await editScreeningService(req.body, req.params.id)
    res.status(200).json({ message: "Updated Successfully" })
})

export const getAllScreenings = asyncHandler(async (req: Request, res: Response) => {
    const screenings = await getAllScreeningsService()
    res.status(200).json(screenings)
})

export const getScreeningDetails = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const screening = await getScreeningDetailsById(req.params.id)
    res.status(200).json(screening)
})
