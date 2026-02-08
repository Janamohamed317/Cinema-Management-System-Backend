import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveHallToDb } from "../../testUtils/hallTestUtils";

describe("Seat Routes Integration Test - restoreSeat", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let hall: any;
    let seat: any;

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
        seat = await saveSeatToDb(buildSeatData(hall.id));
        await prisma.seat.update({
            where: { id: seat.id },
            data: { deletedAt: new Date() },
        });
    });

    afterEach(async () => {
        await prisma.seat.deleteMany({ where: { hallId: hall.id } });
        await prisma.hall.deleteMany({ where: { id: hall.id } });
    });

    describe("restoreSeat with invalid id", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .put("/api/seat/restore/invalid-id")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
            });
        });
    });

    describe("restoreSeat successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can restore seat`, async () => {
                const res = await request(app)
                    .put(`/api/seat/restore/${seat.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Seat Restored Successfully");

                const restoredSeat = await prisma.seat.findUnique({ where: { id: seat.id } });
                expect(restoredSeat?.deletedAt).toBeNull();
                expect(restoredSeat?.status).toBe("ACTIVE");
            });
        });
    });
});
