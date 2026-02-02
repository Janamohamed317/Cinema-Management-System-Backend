import request from "supertest";
import app from "../../../app";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { saveMovieToDb, seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";
import { UserData } from "../../../types/user";
import { randomUUID } from "node:crypto";
import { prisma } from "../../../prismaClient/client";
import { saveHallToDb } from "../../testUtils/hallTestUtils";
import { Hall, Movie, Screening } from "@prisma/client";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";

describe("Screening Routes Integration Test - addScreening", () => {
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken()
        movieManagerData = await seedMovieManagerAndGetToken()
    })
    describe("add Screening with invalid body", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/screening/add")
                    .send({ movieId: randomUUID() })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("add Screening with non existing Movie", () => {
        let hall: Hall
        beforeEach(async () => {
            hall = await saveHallToDb()
        })
        afterEach(async () => {
            await prisma.hall.deleteMany({ where: { id: hall.id } })
        })
        roles.forEach(({ name, token }) => {
            it(`returns 404 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/screening/add")
                    .send({
                        movieId: randomUUID(),
                        hallId: hall.id,
                        startTime: new Date()
                    })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBeDefined();
            });
        });
    });


    describe("add Screening with non existing Hall", () => {
        let movie: Movie
        beforeEach(async () => {
            movie = await saveMovieToDb()
        })
        afterEach(async () => {
            await prisma.movie.deleteMany({ where: { id: movie.id } })
        })
        roles.forEach(({ name, token }) => {
            it(`returns 404 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/screening/add")
                    .send({
                        movieId: movie.id,
                        hallId: randomUUID(),
                        startTime: new Date()
                    })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBeDefined();
            });
        });
    });


    describe("add Screening causing Conflict", () => {
        let screening: Screening
        let movie: Movie
        beforeEach(async () => {
            movie = await saveMovieToDb()
            screening = await saveScreeningToDb("2026-02-10T10:00:00.000Z")
        })
        afterEach(async () => {
            await prisma.screening.deleteMany({ where: { id: screening.id } })
        })
        roles.forEach(({ name, token }) => {
            const time = new Date("2026-02-10T12:00:00.000Z")
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .post("/api/screening/add")
                    .send({
                        movieId: movie.id,
                        hallId: screening.hallId,
                        startTime: time
                    })
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBe("can't assign in that time slot");
            });
        });
    });

})

