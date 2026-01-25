import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prismaClient/client";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { buildMovieData, seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";

describe("Movie Routes Integration Test - editMovie", () => {
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
        const movie = await prisma.movie.create({
            data: buildMovieData()
        });
        movieId = movie.id;
    });

    afterEach(async () => {
        await prisma.movie.deleteMany({ where: { id: movieId } });
    });

    describe("authorization", () => {
        it("returns 401 if no token is provided", async () => {
            const res = await request(app)
                .put(`/api/movie/edit/${movieId}`)
                .send({ name: "Updated Movie" });

            expect(res.status).toBe(401);
        }); 
    });

    describe("validation", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for invalid movie id for ${name}`, async () => {
                const res = await request(app)
                    .put("/api/movie/edit/invalid-id")
                    .send({ name: "Updated Movie" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });

            it(`returns 400 for invalid body for ${name}`, async () => {
                const res = await request(app)
                    .put(`/api/movie/edit/${movieId}`)
                    .send({ duration: -10 }) 
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("not found cases", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 404 if movie does not exist for ${name}`, async () => {
                const res = await request(app)
                    .put(`/api/movie/edit/${randomUUID()}`)
                    .send({ name: "Updated Movie" })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Movie not found");
            });
        });
    });

    describe("successful update", () => {
        const updateRoles = [
            { name: "Admin", token: () => adminData.token, updateData: { name: "Admin Updated Movie" } },
            { name: "MovieManager", token: () => movieManagerData.token, updateData: { duration: 150 } },
        ];

        updateRoles.forEach(({ name, token, updateData }) => {
            it(`${name} can edit movie`, async () => {
                const res = await request(app)
                    .put(`/api/movie/edit/${movieId}`)
                    .send(updateData)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Movie updated successfully");

                const movie = await prisma.movie.findUnique({
                    where: { id: movieId }
                });

                if ('name' in updateData) {
                    expect(movie?.name).toBe(updateData.name);
                }
                if ('duration' in updateData) {
                    expect(movie?.duration).toBe(updateData.duration);
                }
            });
        });
    });
});