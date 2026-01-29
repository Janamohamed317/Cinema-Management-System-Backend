import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { buildMovieData, seedMovieManagerAndGetToken, saveMovieToDb } from "../../testUtils/movieTestUtils";
import { UserData } from "../../../types/user";

describe("Movie Routes Integration Test - addMovie", () => {
    const movieData = buildMovieData();
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        movieManagerData = await seedMovieManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.user.id } });
        await prisma.user.deleteMany({
            where: { id: movieManagerData.user.id },
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
        let existingMovie = null as any;
        beforeEach(async () => {
            existingMovie = await saveMovieToDb();
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send({ ...movieData, name: existingMovie.name })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("addMovie while deleted movie exists", () => {
        let existingMovie = null as any;
        beforeEach(async () => {
            existingMovie = await saveMovieToDb();
            await prisma.movie.update({
                where: { id: existingMovie.id },
                data: { deletedAt: new Date() },
            });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 409 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/movie/add")
                    .send({ ...movieData, name: existingMovie.name })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(409);
                expect(res.body.message).toBe(
                    `Movie "${existingMovie.name}" exists but is deleted. Please restore it instead.`
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
