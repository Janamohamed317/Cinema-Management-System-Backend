import { addHallService, editHallService, findHallById, findHallByName, getAllActiveHalls, isHallDeleted, restoreHallService, softDeleteHallService } from "../../services/hallServices"
import { prisma } from "../../prismaClient/client"
import { HallType, ScreenType } from "@prisma/client"

jest.mock("../../prismaClient/client")

describe("Hall Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("findHallByName", () => {
        it("returns the hall when it exists", async () => {
            const mockHall = { id: "1", name: "Main", deletedAt: null }
                ; (prisma.hall.findFirst as jest.Mock).mockResolvedValue(mockHall)

            const result = await findHallByName("Main")
            expect(result).toEqual(mockHall)
        })

        it("returns null when the hall does not exist", async () => {
            ; (prisma.hall.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findHallByName("Unknown")
            expect(result).toBeNull()
        })
    })

    describe("findHallById", () => {
        it("returns the hall when it exists", async () => {
            const mockHall = { id: "1", name: "Main", deletedAt: null };
            (prisma.hall.findFirst as jest.Mock).mockResolvedValue(mockHall)
            const result = await findHallById("1")
            expect(result).toEqual(mockHall)
        })

        it("returns null when the hall does not exist", async () => {
            ; (prisma.hall.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findHallById("5451")
            expect(result).toBeNull()
        })
    })

    it("Creates a hall and returns it", async () => {
        const hallData = {
            name: "VIP Hall",
            type: HallType.REGULAR,
            screenType: ScreenType.IMAX,
            seatsNumber: 120,
        }

        const createdHall = { id: "1", ...hallData, deletedAt: null };

        (prisma.hall.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.hall.create as jest.Mock).mockResolvedValue(createdHall)

        const result = await addHallService(hallData)
        expect(prisma.hall.create).toHaveBeenCalledWith({ data: hallData })
        expect(result).toEqual(createdHall)
    })

    describe("editHallService", () => {
        it("updates hall name", async () => {
            const data = { name: "changedName" };
            (prisma.hall.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

            await editHallService("123e4567-e89b-12d3-a456-426614174000", data)
            expect(prisma.hall.updateMany).toHaveBeenCalledWith({
                where: { id: "123e4567-e89b-12d3-a456-426614174000", deletedAt: null },
                data,
            })
        })
    })

    it("Soft Delete Hall Service", async () => {

        (prisma.hall.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

        await softDeleteHallService("123e4567-e89b-12d3-a456-426614174000")

        expect(prisma.hall.updateMany).toHaveBeenCalledWith({
            where: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                deletedAt: null
            },
            data: {
                deletedAt: expect.any(Date),
            }
        })
    })

    it("Restore Hall Service", async () => {

        (prisma.hall.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

        await restoreHallService("123e4567-e89b-12d3-a456-426614174000")

        expect(prisma.hall.updateMany).toHaveBeenCalledWith({
            data: {
                deletedAt: null,
            },
            where: {
                id: "123e4567-e89b-12d3-a456-426614174000",
                deletedAt: { not: null },
            },
        })
    })

    it("Get All Halls", async () => {
        const mockHalls = [{ id: "1", name: "Hall A", type: "VIP", seats: 50, screenType: "12315" },
        { id: "2", name: "Hall B", type: "VIP", seats: 50, screenType: "sdf" }];
        (prisma.hall.findMany as jest.Mock).mockResolvedValue(mockHalls)

        const result = await getAllActiveHalls()

        expect(prisma.hall.findMany).toHaveBeenCalledWith({
            where: { deletedAt: null }
        })

        expect(result.length).toEqual(2)

    })

    describe("check if Hall is Deleted", () => {
        it("Not Deleted", () => {
            const hall = {
                id: "1", name: "Hall A",
                type: HallType.REGULAR, seatsNumber: 50, screenType: ScreenType.IMAX, deletedAt: null
            }
            const result = isHallDeleted(hall)

            expect(result).toBeFalsy()
        })

        it("Deleted", () => {
            const hall = {
                id: "1", name: "Hall A",
                type: HallType.REGULAR, seatsNumber: 50, screenType: ScreenType.IMAX, deletedAt: new Date()
            }
            const result = isHallDeleted(hall)

            expect(result).toBeTruthy()
        })
    })
})
