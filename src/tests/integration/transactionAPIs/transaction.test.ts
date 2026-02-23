import request from "supertest";
import crypto from "crypto";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken, seedUserAndGetToken } from "../../testUtils/UserTestUtils";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { saveTicketToDb } from "../../testUtils/ticketTestUtils";


describe("Transaction Routes Integration Test", () => {
    let adminToken: string, userToken: string;
    let adminId: string, userId: string, otherUserId: string;
    let transactionId: string, ticketId: string;
    let screeningId: string, hallId: string, movieId: string, seatId: string;
    let userIds: string[] = []

    beforeAll(async () => {
        const admin = await seedAdminAndGetToken();
        adminToken = admin.token;
        adminId = admin.user.id;

        const user = await seedUserAndGetToken();
        userToken = user.token;
        userId = user.user.id;

        const screening = await saveScreeningToDb(new Date().toISOString());
        screeningId = screening.id;
        hallId = screening.hallId;
        movieId = screening.movieId;

        const seat = await prisma.seat.create({
            data: buildSeatData(hallId)
        });
        seatId = seat.id;

        userIds.push(adminId)
        userIds.push(userId)

        const ticket = await saveTicketToDb(screeningId, seatId, userId);
        transactionId = ticket.transactionId!;
        ticketId = ticket.id;
    });

    afterAll(async () => {
        await prisma.ticket.deleteMany({ where: { userId: { in: userIds } } });
        await prisma.transaction.deleteMany({ where: { userId: { in: userIds } } });
        await prisma.screening.deleteMany({ where: { id: screeningId } });
        await prisma.seat.deleteMany({ where: { id: seatId } });
        await prisma.movie.deleteMany({ where: { id: movieId } });
        await prisma.hall.deleteMany({ where: { id: hallId } });
        await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    });

    describe("GET /api/transaction", () => {
        it("successfully retrieves user transactions", async () => {
            const res = await request(app)
                .get("/api/transaction")
                .set("Authorization", `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(1);
            expect(res.body[0].userId).toBe(userId);
        });

        it("returns 401 if not authenticated", async () => {
            const res = await request(app).get("/api/transaction");
            expect(res.status).toBe(401);
        });
    });

    describe("GET /api/transaction/:id", () => {
        it("successfully retrieves a specific transaction for the owner", async () => {
            const res = await request(app)
                .get(`/api/transaction/${transactionId}`)
                .set("Authorization", `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(res.body.id).toBe(transactionId);
            expect(res.body.userId).toBe(userId);
            expect(res.body.tickets).toBeDefined();
            expect(res.body.tickets.length).toBe(1);
            expect(res.body.tickets[0].screening).toBeDefined();
            expect(res.body.tickets[0].screening.movie).toBeDefined();
            expect(res.body.tickets[0].screening.hall).toBeDefined();
            expect(res.body.tickets[0].seat).toBeDefined();
        });

        it("successfully retrieves any transaction for an admin", async () => {
            const res = await request(app)
                .get(`/api/transaction/${transactionId}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.id).toBe(transactionId);
        });

        it("returns 403 if user tries to access another user's transaction", async () => {
            const otherUser = await seedUserAndGetToken();
            otherUserId = otherUser.user.id;
            userIds.push(otherUserId)

            const res = await request(app)
                .get(`/api/transaction/${transactionId}`)
                .set("Authorization", `Bearer ${otherUser.token}`);

            expect(res.status).toBe(403);
            expect(res.body.message).toBe("Not Authorized to view this transaction");
        });

        it("returns 404 if transaction not found (service behavior)", async () => {
            const res = await request(app)
                .get(`/api/transaction/${crypto.randomUUID()}`)
                .set("Authorization", `Bearer ${userToken}`);

            expect(res.status).toBe(404);
        });
    });
});
