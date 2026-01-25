import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildHallData, seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";

describe("Hall Routes Integration Test - restoreHall", () => {
    let adminData: { admin: User; token: string };
    let hallManagerData: { hallManager: User; token: string };
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
        await prisma.user.deleteMany({ where: { id: adminData.admin.id } });
        await prisma.user.deleteMany({ where: { id: hallManagerData.hallManager.id } });
    });

    beforeEach(async () => {
        const hall = await prisma.hall.create({ data: buildHallData() });
        hallId = hall.id;

        await prisma.hall.update({
            where: { id: hallId },
            data: { deletedAt: new Date() }
        });
    });

    afterEach(async () => {
        await prisma.hall.deleteMany({ where: { id: hallId } });
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid hall id for ${name}`, async () => {
                const res = await request(app)
                    .put("/api/hall/restore/invalid-id")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("hall not found", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 404 if hall does not exist for ${name}`, async () => {
                const res = await request(app)
                    .put(`/api/hall/restore/${randomUUID()}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Hall Not Found");
            });
        });
    });

    describe("successful restoration", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can restore hall`, async () => {
                const res = await request(app)
                    .put(`/api/hall/restore/${hallId}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Hall Restored Successfully");

                const hall = await prisma.hall.findUnique({ where: { id: hallId } });
                expect(hall?.deletedAt).toBeNull();
            });
        });
    });
});
