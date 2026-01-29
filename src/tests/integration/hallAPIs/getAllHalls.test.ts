import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { buildHallData, seedHallManagerAndGetToken, saveHallToDb } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { UserData } from "../../../types/user";

describe("Hall Routes Integration Test - getAllHalls", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let createdHallIds: string[] = [];

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
        createdHallIds = [];
        const hall1 = await saveHallToDb();
        const hall2 = await saveHallToDb();
        createdHallIds.push(hall1.id, hall2.id);


        const deletedHall = await saveHallToDb();
        await prisma.hall.update({
            where: { id: deletedHall.id },
            data: { deletedAt: new Date() }
        });
        createdHallIds.push(deletedHall.id);
    });

    afterEach(async () => {
        await prisma.hall.deleteMany({
            where: { id: { in: createdHallIds } }
        });
    });

    it("returns 401 if no token is provided", async () => {
        const res = await request(app).get("/api/hall/all");
        expect(res.status).toBe(401);
    });

    roles.forEach(({ name, token }) => {
        it(`returns halls for ${name} token`, async () => {
            const res = await request(app)
                .get("/api/hall/all")
                .set("Authorization", `Bearer ${token()}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((hall: any) => expect(hall.deletedAt).toBeNull());
        });
    });
});
