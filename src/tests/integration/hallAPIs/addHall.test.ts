import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildHallData, seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";

describe("Hall Routes Integration Test - addHall", () => {
    let adminData: { token: string, admin: User };
    let hallManagerData: { token: string, hallManager: User };
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
        await prisma.user.deleteMany({ where: { id: adminData.admin.id } });
        await prisma.user.deleteMany({ where: { id: hallManagerData.hallManager.id } });
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
        beforeEach(async () => {
            await prisma.hall.create({ data: hallData });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send(hallData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addHall while deleted hall exists", () => {
        beforeEach(async () => {
            const hall = await prisma.hall.create({ data: hallData });
            await prisma.hall.update({
                where: { id: hall.id },
                data: { deletedAt: new Date() },
            });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/hall/add")
                    .send(hallData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe(
                    `Hall ${hallData.name} exists but is deleted. Please restore it instead of creating a new one.`
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
