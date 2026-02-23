import request from "supertest";
import crypto from "crypto";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { saveHallToDb } from "../../testUtils/hallTestUtils";
import { saveMovieToDb } from "../../testUtils/movieTestUtils";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { saveTicketToDb } from "../../testUtils/ticketTestUtils";
import { TicketStatus, TransactionStatus } from "@prisma/client";

describe("Ticket Routes Integration Test - cancelTicket", () => {
    let token: string;
    let userId: string;
    let screeningId: string;
    let seatId: string;
    let ticketId: string;

    let createdTicketIds: string[] = [];
    let createdScreeningIds: string[] = [];
    let createdSeatIds: string[] = [];
    let createdHallIds: string[] = [];
    let createdMovieIds: string[] = [];
    let createdUserIds: string[] = [];

    beforeAll(async () => {
        const admin = await seedAdminAndGetToken();
        token = admin.token;
        userId = admin.user.id;
        createdUserIds.push(userId);

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);
        const screening = await saveScreeningToDb(futureDate.toISOString());
        screeningId = screening.id;
        createdScreeningIds.push(screening.id);

        createdHallIds.push(screening.hallId);
        createdMovieIds.push(screening.movieId);

        const seat = await prisma.seat.create({
            data: buildSeatData(screening.hallId)
        });
        seatId = seat.id;
        createdSeatIds.push(seat.id);
    });

    beforeEach(async () => {

        const ticket = await saveTicketToDb(screeningId, seatId, userId);
        ticketId = ticket.id;
        createdTicketIds.push(ticket.id);
    });

    afterEach(async () => {
        await prisma.ticket.deleteMany({ where: { id: { in: createdTicketIds } } });
        createdTicketIds = [];
    });

    afterAll(async () => {
        await prisma.transaction.deleteMany({ where: { userId } });
        await prisma.screening.deleteMany({ where: { id: { in: createdScreeningIds } } });
        await prisma.seat.deleteMany({ where: { id: { in: createdSeatIds } } });
        await prisma.movie.deleteMany({ where: { id: { in: createdMovieIds } } });
        await prisma.hall.deleteMany({ where: { id: { in: createdHallIds } } });
        await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    });

    it("successfully cancels a ticket", async () => {
        const res = await request(app)
            .delete(`/api/ticket/cancel/${ticketId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Ticket cancelled successfully");

        const checkedTicket = await prisma.ticket.findUnique({ where: { id: ticketId } });
        expect(checkedTicket?.status).toBe(TicketStatus.REFUNDED);
        expect(checkedTicket?.deletedAt).not.toBeNull();
    });

    it("returns 404 if ticket not found", async () => {
        const res = await request(app)
            .delete(`/api/ticket/cancel/${crypto.randomUUID()}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Ticket not found");
    });
});
