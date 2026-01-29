import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { buildEmployeeUser, seedAdminAndGetToken } from "../../testUtils/UserTestUtils";

describe("Employee Management Routes – Register", () => {
    let token: string;
    let admin: any;
    const empTestUser = buildEmployeeUser()

    beforeAll(async () => {
        admin = await seedAdminAndGetToken();
        token = admin.token
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: admin.user.id } });
    });

    afterEach(async () => {
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { username: empTestUser.username },
                ]
            }
        });
    });

    // Employee Registration

    describe("POST /api/EmployeeManagement/register", () => {
        it("returns 400 if body is invalid", async () => {
            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send({ email: "invalid-email" })
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("returns 409 if employee already exists", async () => {
            await request(app)
                .post("/api/EmployeeManagement/register")
                .send(empTestUser)
                .set("Authorization", `Bearer ${token}`);

            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send(empTestUser)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(409);
            expect(res.body.message).toBeDefined();
        });

        it("returns 201 and registers a new employee", async () => {

            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send(empTestUser)
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(201);
            expect(res.body.newUser).toBeDefined();
            expect(res.body.newUser.email).toBe(empTestUser.email);
        });
    });
});
