import { Movie } from "../generated/prisma";
import { prisma } from "../prismaClient/client";
import { MovieAddingBody, MovieEditingBody } from "../types/movie";


export const findMovieByName = async (name: string) => {
    const movie = await prisma.movie.findFirst({ where: { name } })
    if (movie) {
        return movie
    }
    return null
}

export const findMovieById = async (id: string) => {
    const movie = await prisma.movie.findFirst({ where: { id } })
    if (movie) {
        return movie
    }
    return null
}

export const addMovieService = async (data: MovieAddingBody) => {
    return await prisma.movie.create({
        data,
    });
}

export const softDeleteMovieById = async (id: string) => {
    return await prisma.movie.updateMany({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
    });
}

export const editMovieById = async (id: string, data: MovieEditingBody) => {
    return await prisma.movie.update({
        where: { id },
        data
    });
}

export const restoreMovieById = async (id: string) => {
    return await prisma.movie.update({
        where: { id: id },
        data: { deletedAt: null },
    });
}

export const getMovieConflictInfo = (movie: Movie) => {
    let isDeleted
    if (movie.deletedAt !== null) {
        isDeleted = true
    }
    else {
        isDeleted = false
    }
    return isDeleted;
}
