import { addSeatService, editSeatService, findSeatById, findSeatBySeatNumber, isSeatDeleted, restoreSeatService, 
    softDeleteSeatService, checkAssignedTickets, getAvailableSeats } from "../../services/seatServices"
import { findHallById } from "../../services/hallServices"
import { prisma } from "../../prismaClient/client"
import { SeatStatus, TicketStatus } from "@prisma/client"

jest.mock("../../prismaClient/client")
jest.mock("../../services/hallServices")

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
            hallId: "123e4567-e89b-12d3-a456-426614174000",
            seatNumber: 5,
        }

        const createdSeat = { id: "123e4567-e89b-12d3-a456-426614174001", ...seatData, status: SeatStatus.ACTIVE, createdAt: new Date(), deletedAt: null };

        (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null);
        (findHallById as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174000" });
        (prisma.seat.create as jest.Mock).mockResolvedValue(createdSeat)

        const result = await addSeatService(seatData)
        expect(prisma.seat.create).toHaveBeenCalledWith({ data: seatData })
        expect(result).toEqual(createdSeat)
    })

    describe("editSeatService", () => {
        it("updates seat status", async () => {
            const data = { status: SeatStatus.UNDER_MAINTENANCE };
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);

            const result = await editSeatService("123e4567-e89b-12d3-a456-426614174001", data)
            expect(prisma.seat.updateMany).toHaveBeenCalledWith({
                where: { id: "123e4567-e89b-12d3-a456-426614174001", deletedAt: null },
                data,
            })
            expect(result).toEqual([])
        })
    })

    describe("softDeleteSeatService", () => {
        it("Soft Delete Seat By Id with no future tickets", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => await cb({
                seat: {
                    updateMany: jest.fn().mockResolvedValue({ count: 1 })
                },
                ticket: {
                    update: jest.fn()
                }
            }));

            await softDeleteSeatService("123e4567-e89b-12d3-a456-426614174001")

            expect(prisma.$transaction).toHaveBeenCalled()
        })

        it("Soft Delete Seat By Id WITH future tickets", async () => {
            const mockTickets = [
                { id: "ticket1", user: { email: "test@test.com", username: "test" }, screening: { startTime: new Date() } }
            ];
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const mockUpdateMany = jest.fn().mockResolvedValue({ count: 1 });
            const mockUpdateTicket = jest.fn().mockResolvedValue({ id: "ticket1" });

            (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => await cb({
                seat: {
                    updateMany: mockUpdateMany
                },
                ticket: {
                    update: mockUpdateTicket
                }
            }));

            await softDeleteSeatService("123e4567-e89b-12d3-a456-426614174001")

            expect(prisma.$transaction).toHaveBeenCalled()
            expect(mockUpdateTicket).toHaveBeenCalledWith({
                where: { id: "ticket1" },
                data: { status: TicketStatus.REFUNDED }
            })
        })
    })

    it("Restore Seat Service", async () => {
        (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

        await restoreSeatService("123e4567-e89b-12d3-a456-426614174001")

        expect(prisma.seat.updateMany).toHaveBeenCalledWith({
            where: {
                id: "123e4567-e89b-12d3-a456-426614174001",
                deletedAt: { not: null },
            },
            data: {
                deletedAt: null,
                status: "ACTIVE",
            },
        })
    })

    describe("getAvailableSeats", () => {
        it("returns available seats for a valid screening", async () => {
            const mockScreening = { id: "screening1", hallId: "hall1" }
            const mockSeats = [
                { id: "seat1", seatNumber: 1, hallId: "hall1", status: SeatStatus.ACTIVE },
                { id: "seat2", seatNumber: 2, hallId: "hall1", status: SeatStatus.ACTIVE }
            ];

            (prisma.screening.findUnique as jest.Mock).mockResolvedValue(mockScreening);
            (prisma.seat.findMany as jest.Mock).mockResolvedValue(mockSeats);

            const result = await getAvailableSeats("screening1")

            expect(prisma.screening.findUnique).toHaveBeenCalledWith({
                where: { id: "screening1", deletedAt: null }
            })

            expect(prisma.seat.findMany).toHaveBeenCalledWith({
                where: {
                    hallId: "hall1",
                    deletedAt: null,
                    status: SeatStatus.ACTIVE,
                    tickets: {
                        none: {
                            screeningId: "screening1",
                            deletedAt: null,
                            status: TicketStatus.PAID
                        }
                    }
                }
            })

            expect(result).toEqual(mockSeats)
        })

        it("throws error when screening not found", async () => {
            (prisma.screening.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getAvailableSeats("invalid-screening"))
                .rejects.toThrow("Screening not found")
        })
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
