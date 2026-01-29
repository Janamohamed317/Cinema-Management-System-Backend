import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client'
import { buildFakeUser } from "../../testUtils/UserTestUtils";

describe("Auth Routes Integration Test - Signin", () => {
    const fakeUser = buildFakeUser()

    beforeAll(async () => {
        // Ensure clean state or setup user
        await prisma.user.deleteMany({ where: { email: fakeUser.email } });
        // Create the user for signin tests
        await request(app).post("/api/auth/signup").send(fakeUser);
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { email: fakeUser.email } });
    });

    // Signin tests
    describe("POST /api/auth/signin", () => {
        it("should return 400 if body is invalid", async () => {
            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: "email" });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should return 404 if user doesn't exist", async () => {
            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: "notexist@example.com", password: "Password123!@#" });

            expect(res.status).toBe(404);
            expect(res.body.message).toBe("Email or Password is incorrect");
        });

        it("should return 401 if password is incorrect", async () => {
            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: fakeUser.email, password: "WrongPassword123" });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Email or Password is incorrect");
        });

        it("should signin successfully and return 200 with token", async () => {
            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: fakeUser.email, password: fakeUser.password });


            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.userId).toBeDefined()
        });
    });
});
