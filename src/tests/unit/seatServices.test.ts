import { addSeatService, editSeatById, findSeatById, findSeatBySeatNumber, getAllActiveSeats, isSeatDeleted,
    restoreSeatById, softDeleteSeatById, checkAssignedTickets } from "../../services/seatServices"
import { prisma } from "../../prismaClient/client"
import { SeatStatus, TicketStatus } from "@prisma/client"

jest.mock("../../prismaClient/client")

describe("Seat Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("findSeatBySeatNumber", () => {
        it("returns the seat when it exists", async () => {
            const mockSeat = { id: "1", seatNumber: 1, hallId: "hall1", deletedAt: null }
                ; (prisma.seat.findFirst as jest.Mock).mockResolvedValue(mockSeat)

            const result = await findSeatBySeatNumber(1, "hall1")
            expect(result).toEqual(mockSeat)
            expect(prisma.seat.findFirst).toHaveBeenCalledWith({
                where: {
                    seatNumber: 1,
                    hallId: "hall1"
                }
            })
        })

        it("returns null when the seat does not exist", async () => {
            ; (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findSeatBySeatNumber(1, "hall2")
            expect(result).toBeNull()
        })
    })

    describe("findSeatById", () => {
        it("returns the seat when it exists", async () => {
            const mockSeat = { id: "seat1", seatNumber: 10, deletedAt: null };
            (prisma.seat.findFirst as jest.Mock).mockResolvedValue(mockSeat)
            const result = await findSeatById("seat1")
            expect(result).toEqual(mockSeat)
            expect(prisma.seat.findFirst).toHaveBeenCalledWith({
                where: { id: "seat1" }
            })
        })

        it("returns null when the seat does not exist", async () => {
            ; (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findSeatById("invalid-id")
            expect(result).toBeNull()
        })
    })

    it("Creates a seat and returns it", async () => {
        const seatData = {
            hallId: "hall1",
            seatNumber: 5,
        }

        const createdSeat = { id: "seat1", ...seatData, status: SeatStatus.ACTIVE, createdAt: new Date(), deletedAt: null };

        (prisma.seat.create as jest.Mock).mockResolvedValue(createdSeat)

        const result = await addSeatService(seatData)
        expect(prisma.seat.create).toHaveBeenCalledWith({ data: seatData })
        expect(result).toEqual(createdSeat)
    })

    describe("editSeatById", () => {
        it("updates seat status", async () => {
            const data = { status: SeatStatus.UNDER_MAINTENANCE };
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

            const result = await editSeatById("seat1", data)
            expect(prisma.seat.updateMany).toHaveBeenCalledWith({
                where: { id: "seat1", deletedAt: null },
                data,
            })
            expect(result.count).toEqual(1)
        })
    })

    describe("softDeleteSeatById", () => {
        it("Soft Delete Seat By Id with no future tickets", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);

            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            const result = await softDeleteSeatById("seat1")

            expect(prisma.seat.updateMany).toHaveBeenCalledWith({
                where: {
                    id: "seat1",
                    deletedAt: null
                },
                data: {
                    deletedAt: expect.any(Date),
                    status: SeatStatus.PERMANENTLY_REMOVED,
                }
            })

            expect(result.count).toEqual(1)
        })

        it("Soft Delete Seat By Id WITH future tickets", async () => {
            const mockTickets = [
                { id: "ticket1", user: { email: "test@test.com", username: "test" }, screening: { startTime: new Date() } }
            ];
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
            (prisma.ticket.update as jest.Mock).mockResolvedValue({ id: "ticket1" });

            const result = await softDeleteSeatById("seat1")

            expect(prisma.seat.updateMany).toHaveBeenCalled()
            expect(prisma.ticket.update).toHaveBeenCalledWith({
                where: { id: "ticket1" },
                data: { status: TicketStatus.REFUNDED }
            })
            expect(result.count).toEqual(1)
        })
    })

    it("Restore Seat By Id", async () => {
        (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

        const result = await restoreSeatById("seat1")

        expect(prisma.seat.updateMany).toHaveBeenCalledWith({
            where: {
                id: "seat1",
                deletedAt: { not: null },
            },
            data: {
                deletedAt: null,
                status: "ACTIVE",
            },
        })

        expect(result.count).toEqual(1)
    })

    it("Get All Active Seats", async () => {
        const mockSeats = [
            { id: "seat1", seatNumber: 1, hallId: "hall1" },
            { id: "seat2", seatNumber: 2, hallId: "hall1" }
        ];
        (prisma.seat.findMany as jest.Mock).mockResolvedValue(mockSeats)

        const result = await getAllActiveSeats()

        expect(prisma.seat.findMany).toHaveBeenCalledWith({
            where: { deletedAt: null }
        })

        expect(result.length).toEqual(2)
        expect(result).toEqual(mockSeats)
    })

    describe("check if Seat is Deleted (isSeatDeleted)", () => {
        it("Not Deleted", () => {
            const seat = {
                id: "seat1",
                seatNumber: 1,
                hallId: "hall1",
                status: SeatStatus.ACTIVE,
                createdAt: new Date(),
                deletedAt: null
            }
            const result = isSeatDeleted(seat)

            expect(result).toBeFalsy()
        })

        it("Deleted", () => {
            const seat = {
                id: "seat1",
                seatNumber: 1,
                hallId: "hall1",
                status: SeatStatus.ACTIVE,
                createdAt: new Date(),
                deletedAt: new Date()
            }
            const result = isSeatDeleted(seat)

            expect(result).toBeTruthy()
        })
    })

    describe("checkAssignedTickets", () => {
        it("returns tickets for the seat", async () => {
            const mockTickets = [
                { id: "ticket1", seatId: "seat1" }
            ];
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const result = await checkAssignedTickets("seat1");
            expect(result).toEqual(mockTickets);
            expect(prisma.ticket.findMany).toHaveBeenCalledWith({
                where: { seatId: "seat1", deletedAt: null, screening: { startTime: { gt: expect.any(Date) } } },
                include: {
                    user: { select: { email: true, username: true } },
                    screening: { select: { startTime: true } }
                }
            });
        });
    });
})
