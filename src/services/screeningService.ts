import { prisma } from "../prismaClient/client";
import { ScreeningAddingBody, ScreeningInterval } from "../types/screening";

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

    if ((startTime > existingStart) && (startTime < existingEnd)) {
      return true
    }

    if ((startTime < existingStart) && (endTime > existingStart)) {
      return true;
    }
  }
  return false
}

export const createScreening = async (data: ScreeningAddingBody) => {
  return await prisma.screening.create({ data })
}

