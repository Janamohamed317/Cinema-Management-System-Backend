import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client'
import { buildFakeUser } from "../../testUtils/UserTestUtils";
import * as authServices from "../../../services/authServices";

describe("Auth Routes Integration Test - Signup", () => {
    const fakeUser = buildFakeUser()
    beforeEach(async () => {
        jest.spyOn(authServices, "sendVerificationEmail").mockResolvedValue(undefined);
        await prisma.user.deleteMany({ where: { email: fakeUser.email } });
    });

    afterAll(async () => {
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
            expect(res.body.userId).toBeDefined();
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
