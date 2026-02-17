import request from "supertest";
import crypto from "crypto";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { saveTicketToDb } from "../../testUtils/ticketTestUtils";

describe("Ticket Routes Integration Test - getTicketDetails", () => {
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

        const screening = await saveScreeningToDb(new Date().toISOString());
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
        await prisma.screening.deleteMany({ where: { id: { in: createdScreeningIds } } });
        await prisma.seat.deleteMany({ where: { id: { in: createdSeatIds } } });
        await prisma.movie.deleteMany({ where: { id: { in: createdMovieIds } } });
        await prisma.hall.deleteMany({ where: { id: { in: createdHallIds } } });
        await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    });

    it("successfully retrieves ticket details", async () => {
        const res = await request(app)
            .get(`/api/ticket/${ticketId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(ticketId);
        expect(res.body.screening.id).toBe(screeningId);
        expect(res.body.seat.id).toBe(seatId);
    });

    it("returns null if ticket not found (service behavior to verify)", async () => {

        const res = await request(app)
            .get(`/api/ticket/${crypto.randomUUID()}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeNull();
    });
});
