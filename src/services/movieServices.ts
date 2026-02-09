import { Movie } from "@prisma/client";
import { prisma } from "../prismaClient/client";
import { MovieAddingBody, MovieEditingBody } from "../types/movie";
import { NotFoundError, BadRequestError, ConflictError } from "../utils/error";
import { validateAddingMovie, validateMovieId, validateEditingMovie } from "../utils/validations/movieValidation";

export const findMovieByName = async (name: string): Promise<Movie | null> => {
    return await prisma.movie.findFirst({ where: { name } })
}

export const findMovieById = async (id: string): Promise<Movie | null> => {
    return await prisma.movie.findFirst({ where: { id } })
}

export const addMovieService = async (data: MovieAddingBody) => {
    const { error } = validateAddingMovie(data);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const foundMovie = await findMovieByName(data.name);
    if (foundMovie) {
        const isDeleted = isMovieDeleted(foundMovie)
        if (isDeleted) {
            throw new ConflictError(`Movie "${foundMovie.name}" exists but is deleted. Please restore it instead.`);
        }
        throw new ConflictError("Movie with the same name already exists.");
    }

    return await prisma.movie.create({ data });
}

export const softDeleteMovieService = async (id: string) => {
    const { error } = validateMovieId(id);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const result = await prisma.movie.updateMany({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
    });

    if (result.count === 0) {
        throw new NotFoundError("Movie not found");
    }
}

export const editMovieService = async (id: string, data: MovieEditingBody) => {
    const { error: idError } = validateMovieId(id);
    if (idError) {
        throw new BadRequestError(idError.details[0].message);
    }

    const movie = await findMovieById(id);
    if (!movie) {
        throw new NotFoundError("Movie not found");
    }

    const { error } = validateEditingMovie(data);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    await prisma.movie.update({
        where: { id },
        data
    });
}

export const restoreMovieService = async (id: string) => {
    const { error } = validateMovieId(id);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const movie = await findMovieById(id);
    if (!movie) {
        throw new NotFoundError("Movie not found");
    }

    if (movie.deletedAt === null) {
        throw new ConflictError("Movie is already active");
    }

    await prisma.movie.update({
        where: { id },
        data: { deletedAt: null },
    });
}

export const getAllMovies = async () => {
    return await prisma.movie.findMany({
        where: { deletedAt: null },
    });
}

export const isMovieDeleted = (movie: Movie): boolean => {
    return movie.deletedAt !== null;
}
