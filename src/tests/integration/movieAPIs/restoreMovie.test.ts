import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildMovieData, seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";

describe("Movie Routes Integration Test - restoreMovie", () => {
    let adminData: { admin: User; token: string };
    let movieManagerData: { movieManager: User; token: string };
    let movieId: string;

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
        const movie = await prisma.movie.create({ data: buildMovieData() });
        movieId = movie.id;

        await prisma.movie.update({
            where: { id: movieId },
            data: { deletedAt: new Date() }
        });
    });

    afterEach(async () => {
        await prisma.movie.deleteMany({ where: { id: movieId } });
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid movie id for ${name}`, async () => {
                const res = await request(app)
                    .put("/api/movie/restore/invalid-id")
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
                    .put(`/api/movie/restore/${randomUUID()}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Movie not found");
            });
        });
    });

    describe("successful restoration", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can restore movie`, async () => {
                const res = await request(app)
                    .put(`/api/movie/restore/${movieId}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Movie restored successfully");

                const movie = await prisma.movie.findUnique({ where: { id: movieId } });
                expect(movie?.deletedAt).toBeNull();
            });
        });
    });
});
