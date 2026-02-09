import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { addMovieService, softDeleteMovieService, editMovieService, restoreMovieService, getAllMovies } from "../services/movieServices";
import { MovieAddingBody, MovieEditingBody } from "../types/movie";

export const addMovie = asyncHandler(async (req: Request<{}, {}, MovieAddingBody>, res: Response) => {
    await addMovieService(req.body)
    res.status(201).json({ message: `${req.body.name} added successfully` });
});

export const deleteMovie = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await softDeleteMovieService(req.params.id)
    res.status(200).json({ message: "Deleted successfully" });
});

export const editMovie = asyncHandler(async (req: Request<{ id: string }, {}, MovieEditingBody>, res: Response) => {
    await editMovieService(req.params.id, req.body)
    res.status(200).json({ message: "Movie updated successfully" });
});

export const restoreMovie = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    await restoreMovieService(req.params.id)
    res.status(200).json({ message: "Movie restored successfully" });
});

export const getAllMoviesController = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const movies = await getAllMovies();
    res.status(200).json(movies);
});
