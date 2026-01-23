import request from "supertest";
import app from "../../app";
import { prisma } from '../../prismaClient/client'
import { authTestUser } from "../../utils/testUtils";

describe("Auth Routes Integration Test", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({ where: { email: authTestUser.email } });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });


    describe("POST /api/auth/signup", () => {
        it("should return 400 if body is invalid", async () => {
            const res = await request(app)
                .post("/api/auth/signup")
                .send({ email: "invalidemail" });

            expect(res.status).toBe(400);
            expect(res.body.message).toBeDefined();
        });

        it("should create a new user and return 201 with token", async () => {
            const res = await request(app)
                .post("/api/auth/signup")
                .send(authTestUser);

            expect(res.status).toBe(201);
            expect(res.body.newUser).toBeDefined();
            expect(res.body.newUser.email).toBe(authTestUser.email);
            expect(res.body.token).toBeDefined();
        });

        it("should return 409 if user already exists", async () => {
            await request(app).post("/api/auth/signup").send(authTestUser);

            const res = await request(app)
                .post("/api/auth/signup")
                .send(authTestUser);

            expect(res.status).toBe(409);
            expect(res.body.message).toBe("User Already exists");
        });
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
            await request(app).post("/api/auth/signup").send(authTestUser);

            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: authTestUser.email, password: "WrongPassword123" });

            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Email or Password is incorrect");
        });

        it("should signin successfully and return 200 with token", async () => {
            await request(app).post("/api/auth/signup").send(authTestUser);

            const res = await request(app)
                .post("/api/auth/signin")
                .send({ email: authTestUser.email, password: authTestUser.password });


            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.userId).toBeDefined()
        });
    });
});
