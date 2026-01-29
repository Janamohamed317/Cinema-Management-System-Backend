import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildMovieData, seedMovieManagerAndGetToken, saveMovieToDb } from "../../testUtils/movieTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { UserData } from "../../../types/user";

describe("Movie Routes Integration Test - deleteMovie", () => {
    const movieData = buildMovieData();
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];
    let movieId: string;




    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        movieManagerData = await seedMovieManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.user.id } });
        await prisma.user.deleteMany({ where: { id: movieManagerData.user.id } });
    });

    beforeEach(async () => {
        const movie = await saveMovieToDb();
        movieId = movie.id;
    });

    afterEach(async () => {
        await prisma.movie.deleteMany({ where: { id: movieId } });
    });

    describe("authorization", () => {
        it("returns 401 if no token is provided", async () => {
            const res = await request(app).delete(`/api/movie/delete/${movieId}`);
            expect(res.status).toBe(401);
        });
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid movie id for ${name}`, async () => {
                const res = await request(app)
                    .delete(`/api/movie/delete/invalid-id`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("movie not found", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 404 if movie does not exist for ${name}`, async () => {
                const res = await request(app)
                    .delete(`/api/movie/delete/${randomUUID()}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Movie not found");
            });
        });
    });

    describe("successful deletion", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can delete movie`, async () => {
                const res = await request(app)
                    .delete(`/api/movie/delete/${movieId}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Deleted successfully");

                const movie = await prisma.movie.findUnique({ where: { id: movieId } });
                expect(movie).not.toBeNull();
                expect(movie?.deletedAt).not.toBeNull();
            });
        });
    });
});
