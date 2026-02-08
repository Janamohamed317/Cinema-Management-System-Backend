import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveHallToDb, buildHallData } from "../../testUtils/hallTestUtils";

describe("Seat Routes Integration Test - addSeat", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let seatData: any;
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
        seatData = buildSeatData(hall.id);
    });

    afterEach(async () => {
        await prisma.seat.deleteMany({ where: { hallId: hall.id } });
        await prisma.hall.deleteMany({ where: { id: hall.id } });
    });

    describe("addSeat with invalid body", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/seat/add")
                    .send({ seatNumber: "invalid" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addSeat while active seat exists", () => {
        beforeEach(async () => {
            await saveSeatToDb(seatData);
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/seat/add")
                    .send(seatData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe("Seat with the Same Number Already Exists in This Hall");
            });
        });
    });

    describe("addSeat while deleted seat exists", () => {
        beforeEach(async () => {
            const seat = await saveSeatToDb(seatData);
            await prisma.seat.update({
                where: { id: seat.id },
                data: { deletedAt: new Date() },
            });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/seat/add")
                    .send(seatData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe(
                    `Seat ${seatData.seatNumber} in this hall exists but is deleted. Please restore it instead of creating a new one.`
                );
            });
        });
    });

    describe("addSeat successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can create seat`, async () => {
                const res = await request(app)
                    .post("/api/seat/add")
                    .send(seatData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(201);
                expect(res.body.message).toBeDefined();
            });
        });
    });
});
