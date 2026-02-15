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

describe("Ticket Routes Integration Test - getScreeningTickets", () => {
    let token: string;
    let userId: string;
    let screeningId: string;
    let seatId: string;
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
        createdTicketIds.push(ticket.id);
    });

    afterEach(async () => {
        await prisma.ticket.deleteMany({ where: { userId: userId } });
        createdTicketIds = [];
    });

    afterAll(async () => {
        await prisma.screening.deleteMany({ where: { id: { in: createdScreeningIds } } });
        await prisma.seat.deleteMany({ where: { id: { in: createdSeatIds } } });
        await prisma.movie.deleteMany({ where: { id: { in: createdMovieIds } } });
        await prisma.hall.deleteMany({ where: { id: { in: createdHallIds } } });
        await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    });

    it("successfully retrieves all tickets for a screening", async () => {
        const res = await request(app)
            .get(`/api/ticket/screening/${screeningId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].screeningId).toBe(screeningId);
    });

    it("returns empty array for screening with no tickets", async () => {

        const screening2 = await saveScreeningToDb(new Date().toISOString());
        createdScreeningIds.push(screening2.id);
        createdHallIds.push(screening2.hallId);
        createdMovieIds.push(screening2.movieId);

        const res = await request(app)
            .get(`/api/ticket/screening/${screening2.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});
