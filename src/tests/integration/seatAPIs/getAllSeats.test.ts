import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveHallToDb } from "../../testUtils/hallTestUtils";

describe("Seat Routes Integration Test - getAllSeats", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let hall: any;

    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "HallManager", token: () => hallManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        hallManagerData = await seedHallManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.user.id } });
        await prisma.user.deleteMany({ where: { id: hallManagerData.user.id } });
    });

    beforeEach(async () => {
        hall = await saveHallToDb();
        await saveSeatToDb(buildSeatData(hall.id, 1));
        await saveSeatToDb(buildSeatData(hall.id, 2));
    });

    afterEach(async () => {
        await prisma.seat.deleteMany({ where: { hallId: hall.id } });
        await prisma.hall.deleteMany({ where: { id: hall.id } });
    });

    describe("getAllSeats successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can get all seats`, async () => {
                const res = await request(app)
                    .get("/api/seat/all")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThanOrEqual(2);
            });
        });
    });
});
