import { prisma } from "../../prismaClient/client"
import { addMinutes, createScreening, findScreeningsInHall, checkOverlapping } from "../../services/screeningService"

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

            const result = await findScreeningsInHall("hall-1");

            expect(result).toEqual([
                { startTime: "2026-01-29T12:00:00Z", duration: 120 },
            ]);
        });
    });

    describe("createScreening", () => {
        it("calls prisma.create with correct data", async () => {
            const data = { hallId: "hall-1", startTime: new Date(), movieId: "movie-1" };
            (prisma.screening.create as jest.Mock).mockResolvedValue(data);

            const result = await createScreening(data);

            expect(prisma.screening.create).toHaveBeenCalledWith({ data });
            expect(result).toBe(data);
        });
    });
});
