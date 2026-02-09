import { Screening } from "@prisma/client";
import { prisma } from "../prismaClient/client";
import { ScreeningAddingBody, ScreeningEditingBody, ScreeningInterval } from "../types/screening";
import { NotFoundError, BadRequestError, ConflictError } from "../utils/error";
import { validateScreeningData, validatScreeningId, validateEditScreeningData } from "../utils/validations/screeningValidation";
import { findMovieById } from "./movieServices";
import { findHallById } from "./hallServices";

export const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000);
};

export const findScreeningsInHall = async (hallId: string) => {
  const screenings = await prisma.screening.findMany({
    where: { hallId, deletedAt: null },
    include: { movie: { select: { duration: true } } },
  })

  return screenings.map((s) => ({
    startTime: s.startTime,
    duration: s.movie.duration,
  }));
}

export const checkOverlapping = (screenings: ScreeningInterval[], endTime: Date, startTime: Date) => {
  for (const screening of screenings) {
    const existingStart = new Date(screening.startTime);
    const existingEnd = addMinutes(existingStart, screening.duration + 30);

    if ((startTime >= existingStart) && (startTime < existingEnd)) {
      return true
    }
    if ((startTime <= existingStart) && (endTime > existingStart)) {
      return true;
    }
  }
  return false
}

export const findScreening = async (data: ScreeningAddingBody) => {
  return await prisma.screening.findFirst({ where: { hallId: data.hallId, movieId: data.movieId, startTime: data.startTime } })
}

export const createScreeningService = async (data: ScreeningAddingBody) => {
  const { error } = validateScreeningData(data)
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }

  const { movieId, hallId, startTime } = data
  const startDate = new Date(startTime);

  const foundScreening = await findScreening(data)
  if (foundScreening) {
    const isDeleted = isScreeningDeleted(foundScreening);
    if (isDeleted) {
      throw new ConflictError("Screening already exists, restore it instead of creating a new one");
    }
    throw new ConflictError("Screening already exists");
  }

  const foundMovie = await findMovieById(movieId)
  if (!foundMovie) {
    throw new NotFoundError("The Movie You Are Trying to Add is Not Found");
  }

  const foundHall = await findHallById(hallId)
  if (!foundHall) {
    throw new NotFoundError("The Hall You Are Trying to Assign to is Not Found");
  }

  const endDate = addMinutes(startDate, foundMovie.duration + 30);
  const screenings = await findScreeningsInHall(hallId)
  const conflict = checkOverlapping(screenings, endDate, startDate)

  if (conflict) {
    throw new BadRequestError("can't assign in that time slot")
  }

  return await prisma.screening.create({ data })
}

export const softDeleteScreeningService = async (id: string) => {
  const { error } = validatScreeningId(id)
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }

  const result = await prisma.screening.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } })
  if (result.count === 0) {
    throw new NotFoundError("Screening Not Found");
  }
}

export const restoreScreeningService = async (id: string) => {
  const { error } = validatScreeningId(id)
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }

  const result = await prisma.screening.updateMany({ where: { id, deletedAt: { not: null } }, data: { deletedAt: null } })
  if (result.count === 0) {
    throw new NotFoundError("Screening Not Found");
  }
}

export const isScreeningDeleted = (screening: Screening) => {
  return screening.deletedAt !== null
}

export const getAllScreeningsService = async () => {
  return await prisma.screening.findMany({ where: { deletedAt: null } })
}

export const editScreeningService = async (data: ScreeningEditingBody, id: string) => {
  const { error } = validateEditScreeningData(data)
  if (error) {
    throw new BadRequestError(error.details[0].message)
  }

  const foundScreening = await findScreeningById(id)
  if (!foundScreening) {
    throw new NotFoundError("Screening not found")
  }

  return await prisma.screening.update({ where: { id, deletedAt: null }, data })
}

export const findScreeningById = async (id: string) => {
  return await prisma.screening.findUnique({ where: { id } })
}