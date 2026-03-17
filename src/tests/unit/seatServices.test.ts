import {
    addSeatService, editSeatService, findSeatById, findSeatBySeatNumber, isSeatDeleted, restoreSeatService,
    softDeleteSeatService, checkAssignedTickets, getAvailableSeats, findRequestedSeats, checkSeatsAvailabilty
} from "../../services/seatServices"
import { findHallById } from "../../services/hallServices"
import { prisma } from "../../prismaClient/client"
import { SeatStatus, TicketStatus } from "@prisma/client"
import { BadRequestError, ConflictError, NotFoundError } from "../../utils/error"
import { validateAddingSeat, validateSeatId, validateEditingSeat } from "../../utils/validations/seatValidation";

jest.mock("../../prismaClient/client")
jest.mock("../../services/hallServices")
jest.mock("../../utils/validations/seatValidation", () => ({
    validateAddingSeat: jest.fn(),
    validateSeatId: jest.fn(),
    validateEditingSeat: jest.fn()
}));

describe("Seat Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("findSeatBySeatNumber", () => {
        it("returns the seat when it exists", async () => {
            const mockSeat = { id: "1", seatNumber: 1, hallId: "hall1", deletedAt: null }
                ; (prisma.seat.findFirst as jest.Mock).mockResolvedValue(mockSeat)

            const result = await findSeatBySeatNumber("A1", "hall1")
            expect(result).toEqual(mockSeat)
            expect(prisma.seat.findFirst).toHaveBeenCalledWith({
                where: {
                    seatNumber: "A1",
                    hallId: "hall1"
                }
            })
        })

        it("returns null when the seat does not exist", async () => {
            ; (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findSeatBySeatNumber("A1", "hall2")
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

    describe("addSeatService", () => {
        const seatData = {
            hallId: "123e4567-e89b-12d3-a456-426614174000",
            seatNumber: "A5",
        }

        beforeEach(() => {
            (validateAddingSeat as jest.Mock).mockReturnValue({ error: null });
        });

        it("throws BadRequestError on validation failure", async () => {
            (validateAddingSeat as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid data" }] }
            });

            await expect(addSeatService(seatData)).rejects.toThrow(BadRequestError);
        });

        it("throws ConflictError if seat exists and is not deleted", async () => {
            (prisma.seat.findFirst as jest.Mock).mockResolvedValue({
                id: "s1", deletedAt: null
            });

            await expect(addSeatService(seatData)).rejects.toThrow(ConflictError);
        });

        it("throws ConflictError if seat exists but is deleted", async () => {
            (prisma.seat.findFirst as jest.Mock).mockResolvedValue({
                id: "s1", deletedAt: new Date()
            });

            await expect(addSeatService(seatData)).rejects.toThrow(ConflictError);
        });

        it("throws NotFoundError if hall not found", async () => {
            (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null);
            (findHallById as jest.Mock).mockResolvedValue(null);

            await expect(addSeatService(seatData)).rejects.toThrow(NotFoundError);
        });

        it("creates a seat and returns it", async () => {
            const createdSeat = {
                id: "123e4567-e89b-12d3-a456-426614174001",
                ...seatData,
                status: SeatStatus.ACTIVE,
                createdAt: new Date(),
                deletedAt: null
            };

            (prisma.seat.findFirst as jest.Mock).mockResolvedValue(null);
            (findHallById as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174000" });
            (prisma.seat.create as jest.Mock).mockResolvedValue(createdSeat);

            const result = await addSeatService(seatData)
            expect(prisma.seat.create).toHaveBeenCalledWith({ data: seatData })
            expect(result).toEqual(createdSeat)
        })
    })

    describe("editSeatService", () => {
        beforeEach(() => {
            (validateSeatId as jest.Mock).mockReturnValue({ error: null });
            (validateEditingSeat as jest.Mock).mockReturnValue({ error: null });
        });

        it("throws BadRequestError on invalid id", async () => {
            (validateSeatId as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid id" }] }
            });

            await expect(editSeatService("bad-id", {})).rejects.toThrow(BadRequestError);
        });

        it("throws BadRequestError on invalid data", async () => {
            (validateEditingSeat as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid data" }] }
            });

            await expect(editSeatService("s1", {})).rejects.toThrow(BadRequestError);
        });

        it("throws BadRequestError if status is PERMANENTLY_REMOVED", async () => {
            await expect(
                editSeatService("s1", { status: SeatStatus.PERMANENTLY_REMOVED })
            ).rejects.toThrow(BadRequestError);
        });

        it("throws NotFoundError if seat not found or deleted", async () => {
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 0 });

            await expect(
                editSeatService("s1", { status: SeatStatus.UNDER_MAINTENANCE })
            ).rejects.toThrow(NotFoundError);
        });

        it("returns null if status is not UNDER_MAINTENANCE", async () => {
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            const result = await editSeatService("s1", { status: SeatStatus.ACTIVE });

            expect(result).toBeNull();
        });

        it("updates seat status and returns future tickets when UNDER_MAINTENANCE", async () => {
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
        beforeEach(() => {
            (validateSeatId as jest.Mock).mockReturnValue({ error: null });
        });

        it("throws BadRequestError on invalid id", async () => {
            (validateSeatId as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid id" }] }
            });

            await expect(softDeleteSeatService("bad-id")).rejects.toThrow(BadRequestError);
        });

        it("throws NotFoundError if seat not found", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => cb({
                seat: { updateMany: jest.fn().mockResolvedValue({ count: 0 }) },
                ticket: { update: jest.fn() }
            }));

            await expect(softDeleteSeatService("s1")).rejects.toThrow(NotFoundError);
        });

        it("soft deletes seat with no future tickets", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => await cb({
                seat: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
                ticket: { update: jest.fn() }
            }));

            await softDeleteSeatService("123e4567-e89b-12d3-a456-426614174001")

            expect(prisma.$transaction).toHaveBeenCalled()
        })

        it("soft deletes seat and refunds future tickets", async () => {
            const mockTickets = [{
                id: "ticket1",
                price: 150,
                user: { email: "test@test.com", username: "test" },
                screening: { startTime: new Date(), movie: { name: "Inception" } },
                seat: { seatNumber: "A1" },
                transactionId: "tr1"
            }];

            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const mockUpdateMany = jest.fn().mockResolvedValue({ count: 1 });
            const mockUpdateTicket = jest.fn().mockResolvedValue({ id: "ticket1" });

            (prisma.$transaction as jest.Mock).mockImplementation(async (cb) => await cb({
                seat: { updateMany: mockUpdateMany },
                ticket: { update: mockUpdateTicket }
            }));

            await softDeleteSeatService("123e4567-e89b-12d3-a456-426614174001")

            expect(prisma.$transaction).toHaveBeenCalled()
            expect(mockUpdateTicket).toHaveBeenCalledWith({
                where: { id: "ticket1" },
                data: { status: TicketStatus.REFUNDED }
            })
        })
    })

    describe("restoreSeatService", () => {
        beforeEach(() => {
            (validateSeatId as jest.Mock).mockReturnValue({ error: null });
        });

        it("throws BadRequestError on invalid id", async () => {
            (validateSeatId as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid id" }] }
            });

            await expect(restoreSeatService("bad-id")).rejects.toThrow(BadRequestError);
        });

        it("throws NotFoundError if seat not found", async () => {
            (prisma.seat.updateMany as jest.Mock).mockResolvedValue({ count: 0 });

            await expect(restoreSeatService("s1")).rejects.toThrow(NotFoundError);
        });

        it("restores seat successfully", async () => {
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

    describe("isSeatDeleted", () => {
        const seat = {
            id: "seat1", seatNumber: "A1", hallId: "hall1", status: SeatStatus.ACTIVE,
            createdAt: new Date()
        }

        it("returns false if seat is not deleted", () => {
            const activeSeat = { ...seat, deletedAt: null }
            const result = isSeatDeleted(activeSeat)
            expect(result).toBeFalsy()
        })

        it("returns true if seat is deleted", () => {
            const deletedSeat = { ...seat, deletedAt: new Date() }
            const result = isSeatDeleted(deletedSeat)
            expect(result).toBeTruthy()
        })
    })

    describe("checkAssignedTickets", () => {
        it("returns tickets for the seat", async () => {
            const mockTickets = [{ id: "ticket1", seatId: "seat1" }];
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const result = await checkAssignedTickets("seat1");

            expect(result).toEqual(mockTickets);
            expect(prisma.ticket.findMany).toHaveBeenCalledWith({
                where: { seatId: "seat1", deletedAt: null, screening: { startTime: { gt: expect.any(Date) } } },
                include: {
                    user: { select: { email: true, username: true } },
                    screening: { select: { startTime: true, movie: { select: { name: true } } } },
                    seat: { select: { seatNumber: true } }
                }
            });
        });

        it("returns empty array if no future tickets assigned to seat", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            const result = await checkAssignedTickets("seat1");
            expect(result).toEqual([]);
        });
    });

    describe("findRequestedSeats", () => {
        it("returns matching active seats for the given IDs and hall", async () => {
            const requestedSeatIds = ["s1", "s2"];
            const mockSeats = [
                { id: "s1", seatNumber: "A1", hallId: "h1", status: SeatStatus.ACTIVE, deletedAt: null, createdAt: new Date() },
                { id: "s2", seatNumber: "A2", hallId: "h1", status: SeatStatus.ACTIVE, deletedAt: null, createdAt: new Date() }
            ];

            (prisma.seat.findMany as jest.Mock).mockResolvedValue(mockSeats);

            const seats = await findRequestedSeats(requestedSeatIds, "h1");

            expect(prisma.seat.findMany).toHaveBeenCalledWith({
                where: {
                    id: { in: requestedSeatIds },
                    hallId: "h1",
                    deletedAt: null,
                    status: SeatStatus.ACTIVE
                }
            });
            expect(seats).toEqual(mockSeats);
        });

        it("returns empty array if no seats match", async () => {
            (prisma.seat.findMany as jest.Mock).mockResolvedValue([]);

            const seats = await findRequestedSeats(["s999"], "h1");

            expect(seats).toEqual([]);
        });
    });

    describe("checkSeatsAvailabilty", () => {
        it("throws ConflictError if any seats are already booked", () => {
            expect(() => checkSeatsAvailabilty([{ id: "t1" }] as any, [], 1)).toThrow(ConflictError);
        });

        it("throws BadRequestError if seats length doesn't match requested amount", () => {
            expect(() => checkSeatsAvailabilty([], [{ id: "s1" }] as any, 2)).toThrow(BadRequestError);
        });

        it("passes if no conflicts and seats match requested amount", () => {
            expect(() => checkSeatsAvailabilty([], [{ id: "s1" }, { id: "s2" }] as any, 2)).not.toThrow();
        });
    });

})

