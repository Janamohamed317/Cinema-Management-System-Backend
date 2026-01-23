import request from "supertest";
import app from "../../app";
import { prisma } from '../../prismaClient/client'
import { fakeUser, seedAdminAndGetToken, EmpTestUser } from "../../utils/testUtils";
import { Role } from "@prisma/client";

describe("Employee Management Routes Integration Test", () => {
    let token: string, employeeID: string;
    beforeAll(async () => {
        await prisma.user.deleteMany({ where: { email: fakeUser.email || EmpTestUser.email } });
        token = await seedAdminAndGetToken()

    })
    afterAll(async () => {
        await prisma.$disconnect()
    })

    describe("POST, /api/EmployeeManagement/register", () => {
        it("should return 400 if body is invalid", async () => {
            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send({ email: "InvalidEmail@gmail.com" })
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should return 409 if employee already exist", async () => {
            await request(app).post("/api/EmployeeManagement/register").send(EmpTestUser)
                .set("Authorization", `Bearer ${token}`)

            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send(EmpTestUser)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(409);
            expect(res.body.message).toBeDefined();

            await prisma.user.deleteMany()
        });

        it("should return 201 and register a new employee", async () => {
            const res = await request(app)
                .post("/api/EmployeeManagement/register")
                .send(EmpTestUser)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(201);
            expect(res.body.newUser).toBeDefined();
            employeeID = res.body.newUser.id
        });
    })

    describe("POST, /api/EmployeeManagement/assign", () => {
        it("should return 400 if body is invalid", async () => {

            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: employeeID })
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should return 404 when employee is not found", async () => {
            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: "215", role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(404);
            expect(res.body.message).toBeDefined();
        });

        it("should return 403 when user is not an employee", async () => {
            const response = await request(app).post("/api/auth/signup").send(fakeUser)

            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: response.body.newUser.id, role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(403);
            expect(res.body.message).toBeDefined();
        });


        it("should return 200 and assign role successfully", async () => {
            const res = await request(app)
                .put("/api/EmployeeManagement/assign")
                .send({ userId: employeeID, role: Role.HALL_MANAGER })
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).toBe(200);
            expect(res.body.message).toBeDefined();
            expect(res.body.message).toContain(Role.HALL_MANAGER);
            expect(res.body.message).toContain(EmpTestUser.username);
        });

    })
})
