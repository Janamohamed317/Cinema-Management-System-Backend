import { prisma } from "../../prismaClient/client"
import {
    addMinutes, createScreeningService, findScreeningsInHall, checkOverlapping, findScreening, softDeleteScreeningService,
    restoreScreeningService, isScreeningDeleted, getAllScreeningsService, editScreeningService, findScreeningById
} from "../../services/screeningService"
import { findMovieById } from "../../services/movieServices"
import { findHallById } from "../../services/hallServices"
import { Screening } from "@prisma/client"
import { ScreeningEditingBody } from "../../types/screening"

jest.mock("../../services/movieServices")
jest.mock("../../services/hallServices")

jest.mock("../../prismaClient/client")

describe("Screening Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("addMinutes", () => {
        it("adds the correct number of minutes to a date", () => {
            const date = new Date("2026-01-29T12:00:00Z");
            const result = addMinutes(date, 50);

            expect(result instanceof Date).toBe(true);
            expect(result.getTime()).toBe(date.getTime() + 50 * 60000);
        });
    });

    describe("checkOverlapping", () => {
        it("returns true if new screening overlaps an existing one", () => {
            const startTime = new Date("2026-01-29T12:00:00Z")
            const screenings = [
                { startTime, duration: 120 },
            ];
            const newStart = new Date("2026-01-29T13:00:00Z");
            const newEnd = addMinutes(newStart, 100);

            expect(checkOverlapping(screenings, newEnd, newStart)).toBe(true);
        });

        it("returns false if new screening does not overlap", () => {
            const startTime = new Date("2026-01-29T12:00:00Z")
            const screenings = [
                { startTime, duration: 120 },
            ]
            const newStart = new Date("2026-01-29T15:00:00Z");
            const newEnd = addMinutes(newStart, 100);

            expect(checkOverlapping(screenings, newEnd, newStart)).toBe(false);
        });
    });

    describe("findScreeningsInHall", () => {
        it("returns screenings with startTime and duration", async () => {
            (prisma.screening.findMany as jest.Mock).mockResolvedValue([
                { startTime: "2026-01-29T12:00:00Z", movie: { duration: 120 } },
            ]);

            const result = await findScreeningsInHall("4");

            expect(result).toEqual([
                { startTime: "2026-01-29T12:00:00Z", duration: 120 },
            ]);
        });
    });

    describe("createScreeningService", () => {
        it("calls prisma.create with correct data", async () => {
            const data = {
                hallId: "123e4567-e89b-12d3-a456-426614174000",
                startTime: new Date(),
                movieId: "123e4567-e89b-12d3-a456-426614174001"
            };
            (prisma.screening.findFirst as jest.Mock).mockResolvedValue(null);
            (findMovieById as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174001", duration: 120 });
            (findHallById as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174000" });
            (prisma.screening.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.screening.create as jest.Mock).mockResolvedValue(data);

            const result = await createScreeningService(data);

            expect(prisma.screening.create).toHaveBeenCalledWith({ data });
            expect(result).toBe(data);
        });
    });

    describe("findScreening", () => {
        it("should find screening when it exists", async () => {
            const mockScreening = { hallId: "2", movieId: "1", startTime: new Date("2026-02-10T12:00:00.000Z") }
            const screeningData = { id: "23", ...mockScreening };

            (prisma.screening.findFirst as jest.Mock).mockResolvedValue(screeningData);

            const result = await findScreening(mockScreening);
            expect(prisma.screening.findFirst).toHaveBeenCalledWith({ where: mockScreening });
            expect(result).toEqual(screeningData);
        });

        it("should return null when screening does not exist", async () => {
            const startTime = new Date("2026-02-10T12:00:00.000Z");
            const mockScreening = { hallId: "2", movieId: "1", startTime };

            (prisma.screening.findFirst as jest.Mock).mockResolvedValue(null);

            const result = await findScreening(mockScreening);

            expect(prisma.screening.findFirst).toHaveBeenCalledWith({ where: mockScreening });
            expect(result).toBeNull();
        });
    });

    describe("softDeleteScreeningService", () => {
        it("should deleteScreening", async () => {
            const id = "123e4567-e89b-12d3-a456-426614174002";

            (prisma.screening.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            await softDeleteScreeningService(id);

            expect(prisma.screening.updateMany).toHaveBeenCalledWith({ where: { id, deletedAt: null }, data: { deletedAt: expect.any(Date) } });
        });

    });

    describe("restoreScreeningService", () => {
        it("should restore a deleted screening", async () => {
            const id = "123e4567-e89b-12d3-a456-426614174002";
            const updateResult = { count: 1 };

            (prisma.screening.updateMany as jest.Mock).mockResolvedValue(updateResult);

            await restoreScreeningService(id);

            expect(prisma.screening.updateMany).toHaveBeenCalledWith({
                where: { id, deletedAt: { not: null } },
                data: { deletedAt: null }
            });
        });
    });

    describe("isScreeningDeleted", () => {
        it("should return true if deletedAt is not null", () => {
            const screening = { deletedAt: new Date() } as Screening;
            expect(isScreeningDeleted(screening)).toBe(true);
        });

        it("should return false if deletedAt is null", () => {
            const screening = { deletedAt: null } as Screening;
            expect(isScreeningDeleted(screening)).toBe(false);
        });
    });

    describe("getAllScreeningsService", () => {
        it("should return all non-deleted screenings", async () => {
            const screenings = [{ id: "1", deletedAt: null }];
            (prisma.screening.findMany as jest.Mock).mockResolvedValue(screenings);

            const result = await getAllScreeningsService();

            expect(prisma.screening.findMany).toHaveBeenCalledWith({
                where: { deletedAt: null },
                include: {
                    movie: { select: { name: true, duration: true } },
                    hall: { select: { name: true, type: true } }
                },
                orderBy: { startTime: 'asc' }
            });
            expect(result).toEqual(screenings);
        });
    });

    describe("editScreeningService", () => {
        it("should update a screening", async () => {
            const id = "123e4567-e89b-12d3-a456-426614174002";
            const data: ScreeningEditingBody = { hallId: "123e4567-e89b-12d3-a456-426614174000" };
            const updatedScreening = { id, ...data, deletedAt: null };

            (prisma.screening.findUnique as jest.Mock).mockResolvedValue({ id });
            (prisma.screening.update as jest.Mock).mockResolvedValue(updatedScreening);

            const result = await editScreeningService(data, id);

            expect(prisma.screening.update).toHaveBeenCalledWith({
                where: { id, deletedAt: null },
                data
            });
            expect(result).toEqual(updatedScreening);
        });
    });

    describe("findScreeningById", () => {
        it("should return screening if found", async () => {
            const id = "1";
            const screening = { id };
            (prisma.screening.findUnique as jest.Mock).mockResolvedValue(screening);

            const result = await findScreeningById(id);

            expect(prisma.screening.findUnique).toHaveBeenCalledWith({ where: { id } });
            expect(result).toEqual(screening);
        });

        it("should return null if not found", async () => {
            const id = "1";
            (prisma.screening.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await findScreeningById(id);

            expect(prisma.screening.findUnique).toHaveBeenCalledWith({ where: { id } });
            expect(result).toBeNull();
        });
    });
});
