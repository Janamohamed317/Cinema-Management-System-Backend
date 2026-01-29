import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { buildEmployeeUser, buildFakeUser, seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { Role } from "@prisma/client";

describe("Employee Management Routes – Assign Role", () => {
    let token: string;
    let admin: any;
    const fakeUser = buildFakeUser()
    const empTestUser = buildEmployeeUser()

    beforeAll(async () => {
        admin = await seedAdminAndGetToken();
        token = admin.token
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: admin.user.id } });
    });

    afterEach(async () => {
        // Cleanup created users
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { username: empTestUser.username },
                    { username: fakeUser.username }
                ]
            }
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

            // Check if registration was successful or if user already existed (handle potential 409 if test order varies)
            if (res.status === 201) {
                employeeId = res.body.newUser.id;
            } else {
                // Try to fetch if they exist - simplified for now assuming clean state
                const user = await prisma.user.findFirst({ where: { username: empTestUser.username } })
                employeeId = user?.id || ""
            }
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
