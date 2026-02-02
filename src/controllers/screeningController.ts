import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ScreeningAddingBody, ScreeningEditingBody } from "../types/screening";
import { findMovieById } from "../services/movieServices";
import { addMinutes, checkOverlapping, createScreening, editScreeningService, findScreening, findScreeningById, findScreeningsInHall,
    getAllScreeningsService, isScreeningDeleted, softDeleteScreening, restoreScreeningService
} from "../services/screeningService";
import { validateEditScreeningData, validateScreeningData, validatScreeningId } from "../utils/validations/screeningValidation";
import { findHallById } from "../services/hallServices";


export const addScreening = asyncHandler(async (req: Request<{}, {}, ScreeningAddingBody>, res: Response) => {
    const { error } = validateScreeningData(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const { movieId, hallId, startTime } = req.body
    const startDate = new Date(startTime);

    const foundScreening = await findScreening(req.body)
    if (foundScreening) {
        const isDeleted = isScreeningDeleted(foundScreening);
        res.status(409).json({
            message: isDeleted
                ? "Screening already exists, restore it instead of creating a new one"
                : "Screening already exists",
        });
        return
    }

    const foundMovie = await findMovieById(movieId)
    if (!foundMovie) {
        res.status(404).json({ message: "The Movie You Are Trying to Add is Not Found" });
        return
    }

    const foundHall = await findHallById(hallId)
    if (!foundHall) {
        res.status(404).json({ message: "The Hall You Are Trying to Assign to is Not Found" });
        return
    }

    const endDate = addMinutes(startDate, foundMovie.duration + 30);

    const screenings = await findScreeningsInHall(hallId)

    const conflict = checkOverlapping(screenings, endDate, startDate)

    if (conflict) {
        res.status(400).json({ message: "can't assign in that time slot" })
        return
    }
    await createScreening(req.body)
    res.status(201).json({ message: "added" })
    return
})

export const deleteScreening = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validatScreeningId(req.params.id)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const result = await softDeleteScreening(req.params.id)
    if (result.count === 0) {
        res.status(404).json({ message: "Screening Not Found" });
        return;
    }
    res.status(200).json({ message: "Deleted Successfully" })
    return
})

export const restoreScreening = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validatScreeningId(req.params.id)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const result = await restoreScreeningService(req.params.id)
    if (result.count === 0) {
        res.status(404).json({ message: "Screening Not Found" });
        return;
    }
    res.status(200).json({ message: "restored Successfully" })
    return
})

export const editScreening = asyncHandler(async (req: Request<{ id: string }, {}, ScreeningEditingBody>, res: Response) => {
    const { error } = validateEditScreeningData(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const foundScreening = await findScreeningById(req.params.id)
    if (!foundScreening) {
        res.status(404).json({ message: "Screening not found" })
        return
    }
    await editScreeningService(req.body, req.params.id)
    res.status(200).json({ message: "Updated Successfully" })
    return
})

export const getAllScreenings = asyncHandler(async (req: Request, res: Response) => {
    const screenings = await getAllScreeningsService()
    res.status(200).json(screenings)
}) 
