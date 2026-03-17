import { reserveTicketService, cancelAllTicketsForScreeningService, cancelTicketService, checkTicketBeforeDeletionService, findUserTicketsService, getTicketDetailsService, getScreeningTicketsService, createTickets, completeTicketReservation }
    from "../../services/ticketServices";
import { prisma } from "../../prismaClient/client";
import { getScreeningDetailsById } from "../../services/screeningService";
import { calculateTicketPrice } from "../../utils/pricing";
import { validatePayment } from "../../services/transactionServices";
import { validateTicketReservation, validateTicketId, validateScreeningId } from "../../utils/validations/ticketValidation";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../../utils/error";
import { Decimal } from "@prisma/client/runtime/library";
import { TicketStatus, TransactionStatus } from "@prisma/client";
import { checkSeatsAvailabilty, findRequestedSeats } from "../../services/seatServices";
import { createTransaction } from "../../services/transactionServices";

jest.mock("../../prismaClient/client")
jest.mock("../../services/screeningService");
jest.mock("../../utils/pricing");
jest.mock("../../services/transactionServices");
jest.mock("../../utils/validations/ticketValidation");
jest.mock("../../services/seatServices", () => ({
    findRequestedSeats: jest.fn(),
    checkSeatsAvailabilty: jest.fn()
}));
describe("Ticket Services Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("checkTicketBeforeDeletionService", () => {
        it("throws BadRequestError if screening is in the past", () => {
            const pastDate = new Date(Date.now() - 100000);
            expect(() => checkTicketBeforeDeletionService(pastDate)).toThrow(BadRequestError);
        });

        it("passes if screening is in the future", () => {
            const futureDate = new Date(Date.now() + 100000);
            expect(() => checkTicketBeforeDeletionService(futureDate)).not.toThrow();
        });
    });

    describe("cancelTicketService", () => {
        it("throws BadRequestError for invalid id", async () => {
            (validateTicketId as jest.Mock).mockReturnValue({ error: { details: [{ message: "error" }] } });
            await expect(cancelTicketService("t1", "u1")).rejects.toThrow(BadRequestError);
        });

        it("throws NotFoundError if ticket is missing or deleted", async () => {
            (validateTicketId as jest.Mock).mockReturnValue({ error: null });
            (prisma.ticket.findUnique as jest.Mock).mockResolvedValue(null);
            await expect(cancelTicketService("t1", "u1")).rejects.toThrow(NotFoundError);
        });

        it("throws ForbiddenError if user is not ticket owner", async () => {
            (validateTicketId as jest.Mock).mockReturnValue({ error: null });
            (prisma.ticket.findUnique as jest.Mock).mockResolvedValue({
                userId: "u2",
                deletedAt: null,
                screening: { startTime: new Date(Date.now() + 100000) }
            });
            await expect(cancelTicketService("t1", "u1")).rejects.toThrow(ForbiddenError);
        });

        it("cancels ticket correctly if user owns it and screening is in future", async () => {
            (validateTicketId as jest.Mock).mockReturnValue({ error: null });
            (prisma.ticket.findUnique as jest.Mock).mockResolvedValue({
                id: "t1",
                userId: "u1",
                price: new Decimal(100),
                transactionId: "tr1",
                deletedAt: null,
                screening: { startTime: new Date(Date.now() + 100000), movie: { name: "m1" }, hall: { name: "Hall 1" } },
                user: { email: "user@email.com", username: "user1" },
                seat: { seatNumber: 'A1' }
            });

            await cancelTicketService("t1", "u1");

            expect(prisma.$transaction).toHaveBeenCalled();
        });
    });

    describe("cancelAllTicketsForScreeningService", () => {
        it("throws BadRequestError if screening id is invalid", async () => {
            (validateScreeningId as jest.Mock).mockReturnValue({ error: { details: [{ message: "error" }] } });
            await expect(cancelAllTicketsForScreeningService("s1", "u1")).rejects.toThrow(BadRequestError);
        });

        it("throws NotFoundError if no active tickets exist for the screening and user", async () => {
            (validateScreeningId as jest.Mock).mockReturnValue({ error: null });
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            await expect(cancelAllTicketsForScreeningService("s1", "u1")).rejects.toThrow(NotFoundError);
        });

        it("cancels all tickets successfully", async () => {
            (validateScreeningId as jest.Mock).mockReturnValue({ error: null });
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([
                {
                    id: "t1",
                    price: new Decimal(100),
                    transactionId: "tr1",
                    screening: { startTime: new Date(Date.now() + 100000), movie: { name: "m1" }, hall: { name: "Hall 1" } },
                    user: { email: "user@email.com", username: "user1" },
                    seat: { seatNumber: 'A1' }
                }
            ]);

            const result = await cancelAllTicketsForScreeningService("s1", "u1");

            expect(result).toEqual({ cancelledCount: 1 });
            expect(prisma.$transaction).toHaveBeenCalled();
        });
    });

    describe("reserveTicketService", () => {
        const mockRequest = { ticketData: { seatIDs: ["seat1"], screeningId: "scr1" }, paymentData: { paymentMethod: "CREDIT_CARD" } } as any;

        const mockSeats = [{ id: "seat1" }] as any;

        const mockUpdatedTickets = [{
            id: "t1", status: TicketStatus.PAID, user: { email: "user@email.com", username: "user1" },
            screening: { startTime: new Date(), movie: { name: "Inception" } }, seat: { seatNumber: "A1" }
        }];

        beforeEach(() => {
            (validateTicketReservation as jest.Mock).mockReturnValue({ error: null });
            (getScreeningDetailsById as jest.Mock).mockResolvedValue({ hallId: "hall1", startTime: new Date() });
            (calculateTicketPrice as jest.Mock).mockReturnValue(150);
            (findRequestedSeats as jest.Mock).mockResolvedValue(mockSeats);
            (createTransaction as jest.Mock).mockResolvedValue({ id: "tr1" });
        });

        it("throws BadRequestError on input validation failure", async () => {
            (validateTicketReservation as jest.Mock).mockReturnValue({
                error: { details: [{ message: "invalid input" }] }
            });

            await expect(reserveTicketService(mockRequest, "u1"))
                .rejects.toThrow(BadRequestError);
        });

        it("rejects transaction and throws if validatePayment fails", async () => {
            (validatePayment as jest.Mock).mockImplementation(() => {
                throw new BadRequestError("Payment failed");
            });

            await expect(reserveTicketService(mockRequest, "u1"))
                .rejects.toThrow(BadRequestError);

            expect(prisma.$transaction).toHaveBeenCalled();
        });

        it("creates tickets and completes reservation when payment succeeds", async () => {
            (validatePayment as jest.Mock).mockReturnValue(true);

            (prisma.$transaction as jest.Mock).mockImplementation(async (fn) => {
                (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
                (prisma.ticket.create as jest.Mock).mockResolvedValue({ id: "t1" });
                (prisma.transaction.update as jest.Mock).mockResolvedValue({});
                (prisma.ticket.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
                (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockUpdatedTickets);
                return fn(prisma);
            });

            const result = await reserveTicketService(mockRequest, "u1");

            expect(createTransaction).toHaveBeenCalledWith("CREDIT_CARD", "u1", 150);
            expect(validatePayment).toHaveBeenCalledWith(mockRequest.paymentData);
            expect(result).toEqual(mockUpdatedTickets);
        });
    });

    describe("findUserTicketsService", () => {
        const mockTickets = [{
            id: "t1", userId: "u1", deletedAt: null, createdAt: new Date(),
            screening: { startTime: new Date(), movie: { name: "Inception" }, hall: { name: "Hall A" } },
            seat: { seatNumber: "A1" }
        }];
        it("calls prisma with correct query and returns results", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const result = await findUserTicketsService("u1");

            expect(prisma.ticket.findMany).toHaveBeenCalledWith({
                where: { userId: "u1", deletedAt: null },
                include: {
                    screening: { include: { movie: true, hall: true } },
                    seat: true
                },
                orderBy: { createdAt: "desc" }
            });

            expect(result).toEqual(mockTickets);
        });

        it("returns empty array if user has no active tickets", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);

            const result = await findUserTicketsService("u1");

            expect(result).toEqual([]);
        });
    });

    describe("getTicketDetailsService", () => {
        const mockTickets = [{
            id: "t1", userId: "u1", deletedAt: null, createdAt: new Date(),
            screening: { startTime: new Date(), movie: { name: "Inception" }, hall: { name: "Hall A" } },
            seat: { seatNumber: "A1" }
        }];
        it("calls prisma with correct query and returns ticket", async () => {
            (prisma.ticket.findFirst as jest.Mock).mockResolvedValue(mockTickets[0])

            const ticket = await getTicketDetailsService(mockTickets[0].id)

            expect(prisma.ticket.findFirst).toHaveBeenCalledWith({
                where: { id: mockTickets[0].id, deletedAt: null },
                include: { screening: true, seat: true }
            })

            expect(ticket).toEqual(mockTickets[0])
        })
        it("returns null if ticket not found or soft-deleted", async () => {
            (prisma.ticket.findFirst as jest.Mock).mockResolvedValue(null)

            const ticket = await getTicketDetailsService("nonexistent-id")

            expect(ticket).toBeNull()
        })
    })

    describe("getScreeningTicketsService", () => {
        it("calls prisma with correct query and returns tickets", async () => {
            const mockTickets = [
                {
                    id: "t1",
                    user: { username: "user1", email: "user1@email.com" },
                    seat: { seatNumber: "A1" }
                }
            ];
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockTickets);

            const result = await getScreeningTicketsService("scr1");

            expect(prisma.ticket.findMany).toHaveBeenCalledWith({
                where: { screeningId: "scr1", deletedAt: null },
                include: { user: { select: { username: true, email: true } }, seat: true }
            });
            expect(result).toEqual(mockTickets);
        });

        it("returns empty array if no tickets for screening", async () => {
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);

            const result = await getScreeningTicketsService("scr1");

            expect(result).toEqual([]);
        });
    });

    describe("createTickets", () => {
        const mockData = { ticketData: { seatIDs: ["seat1", "seat2"], screeningId: "scr1" }, paymentData: {} } as any;

        const mockSeats = [{ id: "seat1" }, { id: "seat2" }] as any;

        it("returns ticket IDs after creating tickets inside transaction", async () => {
            (prisma.$transaction as jest.Mock).mockImplementation(async (fn) => {
                (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
                (prisma.ticket.create as jest.Mock).mockResolvedValueOnce({ id: "t1" }).mockResolvedValueOnce({ id: "t2" });
                return fn(prisma);
            });

            const result = await createTickets(mockData, mockSeats, "u1", 150, "tr1");
            expect(result).toEqual(["t1", "t2"]);
        });
        it("throws ConflictError if seats are already booked", async () => {
            (checkSeatsAvailabilty as jest.Mock).mockImplementation(() => {
                throw new ConflictError("Seats already booked");
            });

            (prisma.$transaction as jest.Mock).mockImplementation(async (fn) => {
                (prisma.ticket.findMany as jest.Mock).mockResolvedValue([{ id: "t-existing" }]);
                return fn(prisma);
            });

            await expect(createTickets(mockData, mockSeats, "u1", 150, "tr1"))
                .rejects.toThrow(ConflictError);
        });
    });

    describe("completeTicketReservation", () => {
        it("updates transaction to COMPLETED, tickets to PAID, and returns updated tickets", async () => {
            const mockUpdatedTickets = [
                {
                    id: "t1",
                    status: TicketStatus.PAID,
                    user: { email: "user@email.com", username: "user1" },
                    screening: { startTime: new Date(), movie: { name: "Inception" } },
                    seat: { seatNumber: "A1" }
                }
            ];

            (prisma.$transaction as jest.Mock).mockImplementation(async (fn) => {
                (prisma.transaction.update as jest.Mock).mockResolvedValue({});
                (prisma.ticket.updateMany as jest.Mock).mockResolvedValue({ count: 1 });
                (prisma.ticket.findMany as jest.Mock).mockResolvedValue(mockUpdatedTickets);
                return fn(prisma);
            });

            const result = await completeTicketReservation("tr1", ["t1"]);

            expect(prisma.transaction.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { id: "tr1" },
                    data: { status: TransactionStatus.COMPLETED }
                })
            );
            expect(prisma.ticket.updateMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: { status: TicketStatus.PAID }
                })
            );
            expect(result).toEqual(mockUpdatedTickets);
        });
    });
});