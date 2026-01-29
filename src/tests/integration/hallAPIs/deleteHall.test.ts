import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken, } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildHallData, seedHallManagerAndGetToken, saveHallToDb } from "../../testUtils/hallTestUtils";
import { UserData } from "../../../types/user";

describe("Hall Routes Integration Test - deleteHall", () => {
    let hallData: any;
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
        hallData = buildHallData()
        const hall = await saveHallToDb();
        hallId = hall.id;
    });

    afterEach(async () => {
        await prisma.hall.deleteMany({ where: { id: hallId } });
    });

    describe("authorization", () => {
        it("returns 401 if no token is provided", async () => {
            const res = await request(app)
                .delete(`/api/hall/delete/${hallId}`);

            expect(res.status).toBe(401);
        });
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid hall id for ${name}`, async () => {
                const res = await request(app)
                    .delete("/api/hall/delete/invalid-id")
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
                    .delete(`/api/hall/delete/${randomUUID()}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Hall Not Found");
            });
        });
    });

    describe("successful deletion", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can delete hall`, async () => {
                const res = await request(app)
                    .delete(`/api/hall/delete/${hallId}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Deleted successfully");

                const hall = await prisma.hall.findUnique({
                    where: { id: hallId }
                });

                expect(hall).not.toBeNull();
                expect(hall?.deletedAt).not.toBeNull();
            });
        });
    });
});
