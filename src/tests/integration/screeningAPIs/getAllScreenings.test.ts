import request from "supertest";
import app from "../../../app";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { seedMovieManagerAndGetToken } from "../../testUtils/movieTestUtils";
import { UserData } from "../../../types/user";
import { prisma } from "../../../prismaClient/client";
import { saveScreeningToDb } from "../../testUtils/screeningTestUtils";
import { Screening } from "@prisma/client";

describe("Screening Routes Integration Test - getAllScreenings", () => {
    let adminData: UserData, movieManagerData: UserData
    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "MovieManager", token: () => movieManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken()
        movieManagerData = await seedMovieManagerAndGetToken()
    })

    describe("get All Screenings", () => {
        let screening1: Screening;
        let screening2: Screening;
        let deletedScreening: Screening;

        beforeEach(async () => {
            screening1 = await saveScreeningToDb("2026-02-20T10:00:00.000Z");
            screening2 = await saveScreeningToDb("2026-02-20T14:00:00.000Z");
            deletedScreening = await saveScreeningToDb("2026-02-20T18:00:00.000Z");

            await prisma.screening.update({
                where: { id: deletedScreening.id },
                data: { deletedAt: new Date() }
            });
        });

        afterEach(async () => {
            const ids = [screening1, screening2, deletedScreening].map(s => s.id);
            const movieIds = [screening1, screening2, deletedScreening].map(s => s.movieId);
            const hallIds = [screening1, screening2, deletedScreening].map(s => s.hallId);

            await prisma.screening.deleteMany({ where: { id: { in: ids } } });
            await prisma.movie.deleteMany({ where: { id: { in: movieIds } } });
            await prisma.hall.deleteMany({ where: { id: { in: hallIds } } });
        });

        roles.forEach(({ name, token }) => {
            it(`returns 200 and list of active screenings for ${name}`, async () => {
                const res = await request(app)
                    .get("/api/screening/all")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);

                const ids = res.body.map((s: Screening) => s.id);
                expect(ids).toContain(screening1.id);
                expect(ids).toContain(screening2.id);
                expect(ids).not.toContain(deletedScreening.id);
            });
        });

        it("returns 401 if not authenticated", async () => {
            const res = await request(app).get("/api/screening/all");
            expect(res.status).toBe(401);
        });
    });
});
