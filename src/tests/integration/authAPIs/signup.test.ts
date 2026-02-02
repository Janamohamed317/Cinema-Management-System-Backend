import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client'
import { buildFakeUser } from "../../testUtils/UserTestUtils";

describe("Auth Routes Integration Test - Signup", () => {
    const fakeUser = buildFakeUser()
    beforeEach(async () => {
        await prisma.user.deleteMany({ where: { email: fakeUser.email } });
    });

    afterAll(async () => {
        // await prisma.$disconnect(); // It's better not to disconnect in individual tests if reusing connection, but following valid pattern
        await prisma.user.deleteMany({ where: { email: fakeUser.email } });
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
                .send(fakeUser);

            expect(res.status).toBe(201);
            expect(res.body.newUser).toBeDefined();
            expect(res.body.newUser.email).toBe(fakeUser.email);
            expect(res.body.token).toBeDefined();
        });

        it("should return 409 if user already exists", async () => {
            await request(app).post("/api/auth/signup").send(fakeUser);

            const res = await request(app)
                .post("/api/auth/signup")
                .send(fakeUser);

            expect(res.status).toBe(409);
            expect(res.body.message).toBe("User Already exists");
        });
    });
});
