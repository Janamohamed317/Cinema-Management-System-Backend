import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { buildMovieData, seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";

describe("Movie Routes Integration Test - addMovie", () => {
    let adminData: { token: string; admin: User };
    let movieManagerData: { token: string; movieManager: User };
    const movieData = buildMovieData();

    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        movieManagerData = await seedMovieManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.admin.id } });
        await prisma.user.deleteMany({
            where: { id: movieManagerData.movieManager.id },
        });
    });

    afterEach(async () => {
        await prisma.movie.deleteMany({
            where: { name: movieData.name },
        });
    });

    describe("addMovie with invalid body", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send({ name: "movie" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addMovie while active movie exists", () => {
        beforeEach(async () => {
            await prisma.movie.create({ data: movieData });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send(movieData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addMovie while deleted movie exists", () => {
        beforeEach(async () => {
            const movie = await prisma.movie.create({ data: movieData });
            await prisma.movie.update({
                where: { id: movie.id },
                data: { deletedAt: new Date() },
            });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send(movieData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe(
                    `Movie "${movieData.name}" exists but is deleted. Please restore it instead.`
                );
            });
        });
    });

    describe("addMovie successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can create movie`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send(movieData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(201);
                expect(res.body.message).toBeDefined();
            });
        });
    });
});
