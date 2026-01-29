import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildHallData, seedHallManagerAndGetToken, saveHallToDb } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { UserData } from "../../../types/user";

describe("Hall Routes Integration Test - addHall", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let hallData: any;

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

    beforeEach(() => {
        hallData = buildHallData();
    });

    afterEach(async () => {
        await prisma.hall.deleteMany({
            where: { name: hallData.name }
        });
    });

    describe("addHall with invalid body", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send({ name: "hall" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addHall while active hall exists", () => {
        let existingHall = null as any;
        beforeEach(async () => {
            existingHall = await saveHallToDb();
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send({ ...hallData, name: existingHall.name })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addHall while deleted hall exists", () => {
        let existingHall = null as any;
        beforeEach(async () => {
            existingHall = await saveHallToDb();
            await prisma.hall.update({
                where: { id: existingHall.id },
                data: { deletedAt: new Date() },
            });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send({ ...hallData, name: existingHall.name })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe(
                    `Hall ${existingHall.name} exists but is deleted. Please restore it instead of creating a new one.`
                );
            });
        });
    });

    describe("addHall successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can create hall`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send(hallData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(201);
                expect(res.body.message).toBeDefined();
            });
        });
    });
});
