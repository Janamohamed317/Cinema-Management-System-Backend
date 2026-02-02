import { prisma } from "../../prismaClient/client"
import {
    addMinutes, createScreening, findScreeningsInHall, checkOverlapping, findScreening, softDeleteScreening,
    restoreScreeningService, isScreeningDeleted, getAllScreeningsService, editScreeningService, findScreeningById
} from "../../services/screeningService"
import { Screening } from "@prisma/client"
import { ScreeningEditingBody } from "../../types/screening"

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

    describe("createScreening", () => {
        it("calls prisma.create with correct data", async () => {
            const data = { hallId: "5", startTime: new Date(), movieId: "2" };
            (prisma.screening.create as jest.Mock).mockResolvedValue(data);

            const result = await createScreening(data);

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

    describe("softDeleteScreening", () => {
        it("should deleteScreening", async () => {
            const mockScreening = { id: "123", deletedAt: null };

            (prisma.screening.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            const result = await softDeleteScreening(mockScreening.id);

            expect(prisma.screening.updateMany).toHaveBeenCalledWith({ where: mockScreening, data: { deletedAt: expect.any(Date) } });
            expect(result.count).toEqual(1);
        });

    });

    describe("restoreScreeningService", () => {
        it("should restore a deleted screening", async () => {
            const id = "123";
            const updateResult = { count: 1 };

            (prisma.screening.updateMany as jest.Mock).mockResolvedValue(updateResult);

            const result = await restoreScreeningService(id);

            expect(prisma.screening.updateMany).toHaveBeenCalledWith({
                where: { id, deletedAt: { not: null } },
                data: { deletedAt: null }
            });
            expect(result).toEqual(updateResult);
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

            expect(prisma.screening.findMany).toHaveBeenCalledWith({ where: { deletedAt: null } });
            expect(result).toEqual(screenings);
        });
    });

    describe("editScreeningService", () => {
        it("should update a screening", async () => {
            const id = "1";
            const data: ScreeningEditingBody = { hallId: "123" };
            const updatedScreening = { id, ...data, deletedAt: null };

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
