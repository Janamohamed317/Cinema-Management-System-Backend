import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { buildMovieData, seedMovieManagerAndGetToken, saveMovieToDb } from "../../testUtils/movieTestUtils";

import { UserData } from "../../../types/user";

describe("Movie Routes Integration Test - getAllMovies", () => {
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];
    let createdMoviesIds: string[] = [];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        movieManagerData = await seedMovieManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.user.id } });
        await prisma.user.deleteMany({ where: { id: movieManagerData.user.id } });
    });

    beforeEach(async () => {
        createdMoviesIds = [];
        const movie1 = await saveMovieToDb();
        const movie2 = await saveMovieToDb();
        createdMoviesIds.push(movie1.id, movie2.id);

        const deletedMovie = await saveMovieToDb();
        await prisma.movie.update({
            where: { id: deletedMovie.id },
            data: { deletedAt: new Date() }
        });
        createdMoviesIds.push(deletedMovie.id);

    });

    afterEach(async () => {
        await prisma.movie.deleteMany({
            where: { id: { in: createdMoviesIds } }
        });
    });

    it("returns 401 if no token is provided", async () => {
        const res = await request(app).get("/api/movie/all");
        expect(res.status).toBe(401);
    });

    roles.forEach(({ name, token }) => {
        it(`returns movies for ${name} token`, async () => {
            const res = await request(app)
                .get("/api/movie/all")
                .set("Authorization", `Bearer ${token()}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((movie: any) => expect(movie.deletedAt).toBeNull());
        });
    });
});
