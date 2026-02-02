import { Screening } from "@prisma/client";
import { prisma } from "../prismaClient/client";
import { ScreeningAddingBody, ScreeningEditingBody, ScreeningInterval } from "../types/screening";

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

export const createScreening = async (data: ScreeningAddingBody) => {
  return await prisma.screening.create({ data })
}

export const softDeleteScreening = async (id: string) => {
  return await prisma.screening.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } })
}

export const restoreScreeningService = async (id: string) => {
  return await prisma.screening.updateMany({ where: { id, deletedAt: { not: null } }, data: { deletedAt: null } })
}

export const isScreeningDeleted = (screening: Screening) => {
  return screening.deletedAt !== null
}

export const getAllScreeningsService = async () => {
  return await prisma.screening.findMany({ where: { deletedAt: null } })
}

export const editScreeningService = async (data: ScreeningEditingBody, id: string) => {
  return await prisma.screening.update({ where: { id, deletedAt: null }, data })
}

export const findScreeningById = async (id: string) => {
  return await prisma.screening.findUnique({ where: { id } })
}