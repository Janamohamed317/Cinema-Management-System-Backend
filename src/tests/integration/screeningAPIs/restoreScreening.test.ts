import request from "supertest";
import app from "../../../app";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";
import { UserData } from "../../../types/user";
import { randomUUID } from "node:crypto";
import { prisma } from "../../../prismaClient/client";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { Screening } from "@prisma/client";

describe("Screening Routes Integration Test - restoreScreening", () => {
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken()
        movieManagerData = await seedMovieManagerAndGetToken()
    })

    describe("restore Screening with invalid id", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .put("/api/screening/restore/invalid-id")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
                expect(res.body.message).toBeDefined();
            });
        });
    });

    describe("restore Screening with non existing id", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 404 for ${name} token`, async () => {
                const res = await request(app)
                    .put(`/api/screening/restore/${randomUUID()}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Screening Not Found");
            });
        });
    });

    describe("restore active (not deleted) Screening", () => {
        let screeningData: Screening;

        beforeEach(async () => {
            screeningData = await saveScreeningToDb("2026-02-15T18:00:00.000Z");
        });

        afterEach(async () => {
            await prisma.screening.deleteMany({ where: { id: screeningData.id } });
            await prisma.movie.deleteMany({ where: { id: screeningData.movieId } });
            await prisma.hall.deleteMany({ where: { id: screeningData.hallId } });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 404 for ${name} token because it is not deleted`, async () => {
                const res = await request(app)
                    .put(`/api/screening/restore/${screeningData.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Screening Not Found");
            });
        });
    });

    describe("restore Screening successfully", () => {
        let screeningData: Screening;

        beforeEach(async () => {
            screeningData = await saveScreeningToDb("2026-02-15T18:00:00.000Z");
            await prisma.screening.update({
                where: { id: screeningData.id },
                data: { deletedAt: new Date() }
            });
        });

        afterEach(async () => {
            await prisma.screening.deleteMany({ where: { id: screeningData.id } });
            await prisma.movie.deleteMany({ where: { id: screeningData.movieId } });
            await prisma.hall.deleteMany({ where: { id: screeningData.hallId } });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 200 for ${name} token`, async () => {
                const res = await request(app)
                    .put(`/api/screening/restore/${screeningData.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("restored Successfully");

                const restoredScreening = await prisma.screening.findUnique({
                    where: { id: screeningData.id }
                });
                expect(restoredScreening?.deletedAt).toBeNull();
            });
        });
    });
});
