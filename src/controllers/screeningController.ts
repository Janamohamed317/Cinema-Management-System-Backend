import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ScreeningAddingBody } from "../types/screening";
import { findMovieById } from "../services/movieServices";
import { addMinutes, checkOverlapping, createScreening, findScreeningsInHall } from "../services/screeningService";
import { validatScreeningData } from "../utils/validations/screeningValidation";
import { findHallById } from "../services/hallServices";


export const addScreening = asyncHandler(async (req: Request<{}, {}, ScreeningAddingBody>, res: Response) => {
    const { error } = validatScreeningData(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }
    const { movieId, hallId, startTime } = req.body
    const startDate = new Date(startTime);

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