import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { buildMovieData, seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";

describe("Movie Routes Integration Test - getAllMovies", () => {
    let adminData: { admin: User; token: string };
    let movieManagerData: { movieManager: User; token: string };
    let createdMoviesIds: string[] = [];


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
        await prisma.user.deleteMany({ where: { id: movieManagerData.movieManager.id } });
    });

    beforeEach(async () => {
        createdMoviesIds = [];
        const movie1 = await prisma.movie.create({ data: buildMovieData() });
        const movie2 = await prisma.movie.create({ data: buildMovieData() });
        createdMoviesIds.push(movie1.id, movie2.id);

        const deletedMovie = await prisma.movie.create({ data: buildMovieData() });
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
