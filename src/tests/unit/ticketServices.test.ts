import {reserveTicketService, cancelAllTicketsForScreeningService, cancelTicketService, checkTicketBeforeDeletionService, checkSeats}
 from "../../services/ticketServices";
import { prisma } from "../../prismaClient/client";
import { getScreeningDetailsById } from "../../services/screeningService";
import { calculateTicketPrice } from "../../utils/pricing";
import { validatePayment } from "../../services/transactionServices";
import { validateTicketReservation, validateTicketId, validateScreeningId } from "../../utils/validations/ticketValidation";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "../../utils/error";
import { Decimal } from "@prisma/client/runtime/library";

jest.mock("../../prismaClient/client")
jest.mock("../../services/screeningService");
jest.mock("../../utils/pricing");
jest.mock("../../services/transactionServices");
jest.mock("../../utils/validations/ticketValidation");

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

    describe("checkSeats", () => {
        it("throws ConflictError if any requested seats are already booked", () => {
            expect(() => checkSeats([{ id: "1" }] as any, [], 1)).toThrow(ConflictError);
        });

        it("throws BadRequestError if the number of valid active seats fetched doesn't match requested", () => {
            expect(() => checkSeats([], [{ id: "1" }] as any, 2)).toThrow(BadRequestError);
        });

        it("passes if active seats match requested amount and none are booked", () => {
            expect(() => checkSeats([], [{ id: "1" }, { id: "2" }] as any, 2)).not.toThrow();
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
                screening: { startTime: new Date(Date.now() + 100000) }
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
                    screening: { startTime: new Date(Date.now() + 100000) }
                }
            ]);

            const result = await cancelAllTicketsForScreeningService("s1", "u1");

            expect(result).toEqual({ cancelledCount: 1 });
            expect(prisma.$transaction).toHaveBeenCalled();
        });
    });

    describe("reserveTicketService", () => {
        it("throws BadRequestError on input validation failure", async () => {
            (validateTicketReservation as jest.Mock).mockReturnValue({ error: { details: [{ message: "invalid input" }] } });
            await expect(reserveTicketService({ ticketData: {} } as any, "u1")).rejects.toThrow(BadRequestError);
        });

        it("marks transaction REJECTED if validatePayment throws an error", async () => {
            (validateTicketReservation as jest.Mock).mockReturnValue({ error: null });
            (getScreeningDetailsById as jest.Mock).mockResolvedValue({ hallId: "hall1", startTime: new Date() });
            (calculateTicketPrice as jest.Mock).mockReturnValue(100);
            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);
            (prisma.seat.findMany as jest.Mock).mockResolvedValue([{ id: "seat1" }]);
            (prisma.ticket.create as jest.Mock).mockResolvedValue({ id: "t1" });
            (prisma.transaction.create as jest.Mock).mockResolvedValue({ id: "tr1" });
            (validatePayment as jest.Mock).mockImplementation(() => {
                throw new BadRequestError("Payment Error");
            });

            await expect(
                reserveTicketService({
                    ticketData: { seatIDs: ["seat1"], screeningId: "scr1" },
                    paymentData: {}
                } as any, "u1")
            ).rejects.toThrow(BadRequestError);

            expect(prisma.$transaction).toHaveBeenCalled();
        });

        it("completes transaction and creates tickets when payment succeeds", async () => {
            (validateTicketReservation as jest.Mock).mockReturnValue({ error: null });
            (getScreeningDetailsById as jest.Mock).mockResolvedValue({hallId: "hall1",startTime: new Date()});
            (calculateTicketPrice as jest.Mock).mockReturnValue(100);
            (prisma.transaction.create as jest.Mock).mockResolvedValue({ id: "tr1" });

            (prisma.ticket.findMany as jest.Mock).mockResolvedValue([]);  
            (prisma.seat.findMany as jest.Mock).mockResolvedValue([{ id: "seat1" }]);  
            (prisma.ticket.create as jest.Mock).mockResolvedValue({ id: "t1" });
            (prisma.ticket.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            (validatePayment as jest.Mock).mockReturnValue(true);

            const result = await reserveTicketService({
                ticketData: { seatIDs: ["seat1"], screeningId: "scr1" },
                paymentData: {}} as any, "u1");

            expect(result).toBeDefined();
            expect(prisma.$transaction).toHaveBeenCalled();
        });
    });
});