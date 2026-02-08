import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveHallToDb } from "../../testUtils/hallTestUtils";

describe("Seat Routes Integration Test - editSeat", () => {
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
    });

    afterEach(async () => {
        await prisma.seat.deleteMany({ where: { hallId: hall.id } });
        await prisma.hall.deleteMany({ where: { id: hall.id } });
    });

    describe("editSeat with invalid id", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .put("/api/seat/edit/invalid-id")
                    .send({ status: "UNDER_MAINTENANCE" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
            });
        });
    });

    describe("editSeat with invalid body", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .put(`/api/seat/edit/${seat.id}`)
                    .send({ status: 123 })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
            });
        });
    });

    describe("editSeat successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can edit seat`, async () => {
                const res = await request(app)
                    .put(`/api/seat/edit/${seat.id}`)
                    .send({ status: "UNDER_MAINTENANCE" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                // The controller now returns { tickets: [] } or similar if UNDER_MAINTENANCE
                expect(res.body.tickets).toBeDefined();
            });
        });
    });

    describe("editSeat attempt to PERMANENTLY_REMOVED", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} cannot set status to PERMANENTLY_REMOVED`, async () => {
                const res = await request(app)
                    .put(`/api/seat/edit/${seat.id}`)
                    .send({ status: "PERMANENTLY_REMOVED" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBe("Cannot set status to PERMANENTLY_REMOVED. Use delete endpoint instead.");
            });
        });
    });
});
