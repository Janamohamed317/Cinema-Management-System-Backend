import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";;
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { getScreeningDetailsById } from "../../../services/screeningService";
import { calculateTicketPrice } from "../../../utils/pricing";
import { buildInvalidPaymentData, buildPaymentData, saveTransactionToDb } from "../../testUtils/transactionTestUtils";
import { PaymentData } from "../../../types/transaction";
import { TicketAddingBody } from "../../../types/ticket";
import { TicketStatus, TransactionStatus } from "@prisma/client";

describe("Ticket Routes Integration Test - reserveTicket", () => {
    let token: string;
    let userId: string;
    let screeningId: string;
    let seatId: string;
    let hallId: string
    let movieId: string
    let price: number
    let paymentData: PaymentData
    let ticketData: TicketAddingBody


    beforeAll(async () => {
        const admin = await seedAdminAndGetToken();
        token = admin.token;
        userId = admin.user.id;

        const screening = await saveScreeningToDb(new Date().toISOString());
        screeningId = screening.id;
        movieId = screening.movieId
        hallId = screening.hallId
        paymentData = buildPaymentData()

        const screeningDetails = await getScreeningDetailsById(screeningId)
        price = calculateTicketPrice(screeningDetails)

        const seat = await prisma.seat.create({
            data: buildSeatData(screening.hallId)
        });
        seatId = seat.id;

        ticketData = { screeningId, seatIDs: [seatId], userId }
    });

    afterEach(async () => {
        await prisma.ticket.deleteMany({ where: { userId } });
        await prisma.transaction.deleteMany({ where: { userId } });
    });

    afterAll(async () => {
        await prisma.transaction.deleteMany({ where: { userId } });
        await prisma.seat.delete({ where: { id: seatId } });
        await prisma.screening.delete({ where: { id: screeningId } });
        await prisma.movie.delete({ where: { id: movieId } });
        await prisma.hall.delete({ where: { id: hallId } });
        await prisma.user.delete({ where: { id: userId } });
    });

    it("successfully reserves a ticket", async () => {
        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ ticketData, paymentData });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Tickets reserved successfully");
        expect(res.body.tickets.length).toBe(1);
        expect(res.body.tickets[0].userId).toBe(userId);
        expect(parseFloat(res.body.tickets[0].price)).toBeCloseTo(price, 2)
        const ticket = await prisma.ticket.findUnique({
            where: { id: res.body.tickets[0].id },
        });
        expect(ticket?.status).toBe(TicketStatus.PAID)
        const transaction = await prisma.transaction.findUnique({
            where: { id: ticket?.transactionId },
        });
        expect(transaction?.status).toBe(TransactionStatus.COMPLETED)
        expect(Number(transaction?.totalAmount)).toBeCloseTo(price);
    });

    it("returns 409 if seat is already booked", async () => {
        const transaction = await saveTransactionToDb(userId)
        await prisma.ticket.create({
            data: { screeningId, seatId, userId, status: "PAID", price, transactionId: transaction.id }
        });

        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ ticketData, paymentData });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe("Some seats are already booked");
    });

    it("returns 400 for invalid request body", async () => {
        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ ticketData: { ...ticketData, screeningId: "invalid-uuid" }, paymentData });
        expect(res.status).toBe(400);
    });

    it("returns 400 if payment validation fails", async () => {
        const invalidPaymentData = buildInvalidPaymentData()
        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ ticketData, paymentData: invalidPaymentData });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Invalid card number");
        
        const transaction = await prisma.transaction.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } });
        expect(transaction?.status).toBe(TransactionStatus.REJECTED);
        
        const tickets = await prisma.ticket.findMany({where: { transactionId: transaction?.id }});
        expect(tickets.length).toBeGreaterThan(0);
        tickets.forEach(ticket => {expect(ticket.status).toBe(TicketStatus.CANCELLED);
        });
    });
});
