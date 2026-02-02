import { Hall, Movie } from "@prisma/client";
import { saveHallToDb } from "./hallTestUtils";
import { saveMovieToDb } from "./movieTestUtils";
import { prisma } from "../../prismaClient/client";

export const buildScreeningData = async (startTime: Date) => {
    const hall: Hall = await saveHallToDb()
    const movie: Movie = await saveMovieToDb()

    return {
        hallId: hall.id,
        movieId: movie.id,
        startTime,
    };
};

export const saveScreeningToDb = async (date: string) => {
    const startTime = new Date(date);
    const screeningData = await buildScreeningData(startTime)
    const screening = await prisma.screening.create({ data: screeningData })
    return screening
}