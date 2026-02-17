import { Hall, HallType, Movie, ScreenType } from "@prisma/client";
import { saveHallToDb } from "./hallTestUtils";
import { saveMovieToDb } from "./movieTestUtils";
import { prisma } from "../../prismaClient/client";
import { ScreeningDetails } from "../../types/screening";

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


export const buildScreeningDetails = (hourUTC: number, hallType: HallType, screenType: ScreenType): ScreeningDetails => ({
    hall: { name: "hall1", screenType, type: hallType },
    movie: { duration: 50, name: "name" },
    startTime: new Date(Date.UTC(2026, 1, 10, hourUTC, 0, 0))
});
