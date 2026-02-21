import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { saveTicketToDb } from "../../testUtils/ticketTestUtils";

describe("Seat Routes Integration Test - getAvailableSeats", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let screening: any;
    let seat1: any;
    let seat2: any;

    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "HallManager", token: () => hallManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        hallManagerData = await seedHallManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.transaction.deleteMany({ where: { userId: { in: [adminData.user.id, hallManagerData.user.id] } } });
        await prisma.user.deleteMany({ where: { id: { in: [adminData.user.id, hallManagerData.user.id] } } });
    });

    beforeEach(async () => {
        screening = await saveScreeningToDb(new Date(Date.now() + 100000).toISOString());
        seat1 = await saveSeatToDb(buildSeatData(screening.hallId, 1));
        seat2 = await saveSeatToDb(buildSeatData(screening.hallId, 2));
    });

    afterEach(async () => {
        await prisma.ticket.deleteMany({ where: { screeningId: screening.id } });
        await prisma.seat.deleteMany({ where: { hallId: screening.hallId } });
        await prisma.screening.deleteMany({ where: { id: screening.id } });
        await prisma.movie.deleteMany({ where: { id: screening.movieId } });
        await prisma.hall.deleteMany({ where: { id: screening.hallId } });
    });

    describe("getAvailableSeats successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can get available seats`, async () => {
                const res = await request(app)
                    .get(`/api/seat/available-seats/${screening.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBe(2);
            });
        });

        it("filters out paid seats", async () => {
            await saveTicketToDb(screening.id, seat1.id, adminData.user.id);
            const resAdmin = await request(app)
                .get(`/api/seat/available-seats/${screening.id}`)
                .set("Authorization", `Bearer ${adminData.token}`);

            expect(resAdmin.status).toBe(200);
            expect(resAdmin.body.length).toBe(1);
            expect(resAdmin.body[0].id).toBe(seat2.id);
        });
    });

    it("returns 404 for non-existent screening", async () => {
        const res = await request(app)
            .get("/api/seat/available-seats/00000000-0000-0000-0000-000000000000")
            .set("Authorization", `Bearer ${adminData.token}`);

        expect(res.status).toBe(404);
    });
});
