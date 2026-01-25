import request from "supertest";
import app from "../../app";
import { prisma } from "../../prismaClient/client";
import { buildEmployeeUser, buildFakeUser, seedAdminAndGetToken } from "../testUtils/UserTestUtils";
import { Role } from "@prisma/client";
import { userInfo } from "node:os";

describe("Employee Management Routes – Integration Tests", () => {
    let token: string;
    let admin: any;
    const fakeUser = buildFakeUser()
    const empTestUser = buildEmployeeUser()
    beforeAll(async () => {
        admin = await seedAdminAndGetToken();
        token = admin.token
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    afterEach(async () => {
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { username: empTestUser.username },
                    { username: fakeUser.username }
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

    // Employee Role Assignment
    describe("PUT /api/EmployeeManagement/assign", () => {
        let employeeId: string;

        beforeEach(async () => {
            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send(empTestUser)
                .set("Authorization", `Bearer ${token}`);

            employeeId = res.body.newUser.id;
        });

        it("returns 400 if body is invalid", async () => {
            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: employeeId })
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("returns 404 if employee is not found", async () => {
            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: "non-existent-id", role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("returns 403 if user is not an employee", async () => {
            const signupRes = await request(app)
                .post("/api/auth/signup")
                .send(fakeUser);

            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: signupRes.body.newUser.id, role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });

        it("returns 200 and assigns role successfully", async () => {
            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: employeeId, role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
            expect(res.body.message).toContain(Role.HALL_MANAGER);
        });
    });
});
