import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findMovieByName, findMovieById, softDeleteMovieById, editMovieById, restoreMovieById, addMovieService, getMovieConflictInfo, }
    from "../services/movieServices";
import { validateAddingMovie, validateMovieId, validateEditingMovie } from "../utils/validations/movieValidation";
import { MovieAddingBody, MovieEditingBody } from "../types/movie";

import { prisma } from "../prismaClient/client"

export const addMovie = asyncHandler(async (req: Request<{}, {}, MovieAddingBody>, res: Response) => {
    const { error } = validateAddingMovie(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    const foundMovie = await findMovieByName(req.body.name);

    if (foundMovie) {
        const isDeleted = getMovieConflictInfo(foundMovie)
        isDeleted ? res.status(409).json({ message: " `Movie with the same name already exists.`" }) :
            res.status(400).json({
                message: `Movie "${foundMovie.name}" exists but is deleted. Please restore it instead.`
            })
        return
    }

    await addMovieService(req.body)

    res.status(201).json({ message: `${req.body.name} added successfully` });
}
);


export const deleteMovie = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateMovieId(req.params.id);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    const { id } = req.params;

    const result = await softDeleteMovieById(id)


    if (result.count === 0) {
        res.status(404).json({ message: "Movie not found" });
        return;
    }

    res.status(200).json({ message: "Deleted successfully" });
}
);

export const editMovie = asyncHandler(async (req: Request<{ id: string }, {}, MovieEditingBody>, res: Response) => {
    const { error: idError } = validateMovieId(req.params.id);
    if (idError) {
        res.status(400).json({ message: idError.details[0].message });
        return;
    }

    const movie = await findMovieById(req.params.id);
    if (!movie) {
        res.status(404).json({ message: "Movie not found" });
        return;
    }

    const { error } = validateEditingMovie(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    await editMovieById(req.params.id, req.body)

    res.status(200).json({ message: "Movie updated successfully" });
}
);

export const restoreMovie = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateMovieId(req.params.id);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    const movie = await findMovieById(req.params.id);
    if (!movie) {
        res.status(404).json({ message: "Movie not found" });
        return;
    }

    if (movie.deletedAt === null) {
        res.status(409).json({ message: "Movie is already active" });
        return;
    }

    await restoreMovieById(req.params.id)

    res.status(200).json({ message: "Movie restored successfully" });
}
);

export const getAllMovies = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
        const movies = await prisma.movie.findMany({
            where: { deletedAt: null },
        });

        res.status(200).json(movies);
    }
);
