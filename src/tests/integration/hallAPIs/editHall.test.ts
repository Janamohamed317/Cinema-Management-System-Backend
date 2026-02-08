import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildHallData, seedHallManagerAndGetToken, saveHallToDb } from "../../testUtils/hallTestUtils";
import { UserData } from "../../../types/user";

describe("Hall Routes Integration Test - editHall", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let hallId: string;

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
        const hall = await saveHallToDb();
        hallId = hall.id;
    });

    afterEach(async () => {
        await prisma.hall.deleteMany({ where: { id: hallId } });
    });

    describe("authorization", () => {
        it("returns 401 if no token is provided", async () => {
            const res = await request(app)
                .put(`/api/hall/edit/${hallId}`)
                .send({ seatsNumber: 100 });

            expect(res.status).toBe(401);
        });
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid hall id for ${name}`, async () => {
                const res = await request(app)
                    .put("/api/hall/edit/invalid-id")
                    .send({ seatsNumber: 100 })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });

            it(`returns 400 for invalid body for ${name}`, async () => {
                const res = await request(app)
                    .put(`/api/hall/edit/${hallId}`)
                    .send({ seatsNumber: -5 })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("not found cases", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 404 if hall does not exist for ${name}`, async () => {
                const res = await request(app)
                    .put(`/api/hall/edit/${randomUUID()}`)
                    .send({ seatsNumber: 120 })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Hall not found or deleted");
            });

            it(`returns 404 if hall is deleted for ${name}`, async () => {
                await prisma.hall.update({
                    where: { id: hallId },
                    data: { deletedAt: new Date() }
                });

                const res = await request(app)
                    .put(`/api/hall/edit/${hallId}`)
                    .send({ seatsNumber: 120 })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Hall not found or deleted");
            });
        });
    });

    describe("successful update", () => {
        const updateRoles = [
            { name: "Admin", token: () => adminData.token, value: 120 },
            { name: "HallManager", token: () => hallManagerData.token, value: 90 },
        ];

        updateRoles.forEach(({ name, token, value }) => {
            it(`${name} can edit hall`, async () => {
                const res = await request(app)
                    .put(`/api/hall/edit/${hallId}`)
                    .send({ seatsNumber: value })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Hall updated successfully");

                const hall = await prisma.hall.findUnique({
                    where: { id: hallId }
                });

                expect(hall?.seatsNumber).toBe(value);
            });
        });
    });
});
