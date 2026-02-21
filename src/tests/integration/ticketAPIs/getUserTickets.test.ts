import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { saveHallToDb } from "../../testUtils/hallTestUtils";
import { saveMovieToDb } from "../../testUtils/movieTestUtils";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { saveTicketToDb } from "../../testUtils/ticketTestUtils";

describe("Ticket Routes Integration Test - getUserTickets", () => {
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

    afterEach(async () => {
        await prisma.ticket.deleteMany({ where: { userId: userId } });
    });

    afterAll(async () => {
        await prisma.transaction.deleteMany({ where: { userId } });
        await prisma.screening.deleteMany({ where: { id: { in: createdScreeningIds } } });
        await prisma.seat.deleteMany({ where: { id: { in: createdSeatIds } } });
        await prisma.movie.deleteMany({ where: { id: { in: createdMovieIds } } });
        await prisma.hall.deleteMany({ where: { id: { in: createdHallIds } } });
        await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    });

    it("successfully retrieves user tickets", async () => {

        await saveTicketToDb(screeningId, seatId, userId);

        const res = await request(app)
            .get("/api/ticket/my-tickets")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].userId).toBe(userId);
    });

    it("returns empty array if user has no tickets", async () => {
        const res = await request(app)
            .get("/api/ticket/my-tickets")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});
