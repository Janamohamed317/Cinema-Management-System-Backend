import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { saveHallToDb } from "../../testUtils/hallTestUtils";
import { saveMovieToDb } from "../../testUtils/movieTestUtils";
import { buildScreeningDetails, saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { buildSeatData } from "../../testUtils/seatTestUtils";
import { HallType, ScreenType } from "@prisma/client";
import { ScreeningDetails } from "../../../types/screening";
import { getScreeningDetailsById } from "../../../services/screeningService";
import { calculateTicketPrice } from "../../../utils/pricing";

describe("Ticket Routes Integration Test - reserveTicket", () => {
    let token: string;
    let userId: string;
    let screeningId: string;
    let seatId: string;
    let createdScreeningIds: string[] = [];
    let createdSeatIds: string[] = [];
    let createdHallIds: string[] = [];
    let createdMovieIds: string[] = [];
    let createdUserIds: string[] = [];
    let price: number

    beforeAll(async () => {
        const admin = await seedAdminAndGetToken();
        token = admin.token;
        userId = admin.user.id;
        createdUserIds.push(userId);

        const screening = await saveScreeningToDb(new Date().toISOString());
        screeningId = screening.id;
        createdScreeningIds.push(screening.id);


        const screeningDetails = await getScreeningDetailsById(screeningId)
        price = calculateTicketPrice(screeningDetails)

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
        await prisma.screening.deleteMany({ where: { id: { in: createdScreeningIds } } });
        await prisma.seat.deleteMany({ where: { id: { in: createdSeatIds } } });
        await prisma.movie.deleteMany({ where: { id: { in: createdMovieIds } } });
        await prisma.hall.deleteMany({ where: { id: { in: createdHallIds } } });
        await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    });

    it("successfully reserves a ticket", async () => {
        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ screeningId, seatIDs: [seatId] });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Tickets reserved successfully");
        expect(res.body.tickets.length).toBe(1);
        expect(res.body.tickets[0].userId).toBe(userId);
        expect(res.body.tickets[0].price).toBe(price)
    });

    it("returns 409 if seat is already booked", async () => {
        await prisma.ticket.create({
            data: {
                screeningId,
                seatId,
                userId,
                status: "PAID",
                price
            }
        });

        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ screeningId, seatIDs: [seatId] });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe("Some seats are already booked");
    });

    it("returns 400 for invalid request body", async () => {
        const res = await request(app)
            .post("/api/ticket/reserve")
            .set("Authorization", `Bearer ${token}`)
            .send({ screeningId: "invalid-uuid" });
        expect(res.status).toBe(400);
    });
});
