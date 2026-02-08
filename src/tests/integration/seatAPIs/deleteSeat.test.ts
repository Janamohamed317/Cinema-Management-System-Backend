import request from "supertest";
import app from "../../../app";
import { prisma } from '../../../prismaClient/client';
import { buildSeatData, saveSeatToDb } from "../../testUtils/seatTestUtils";
import { seedHallManagerAndGetToken } from "../../testUtils/hallTestUtils";
import { seedAdminAndGetToken } from "../../testUtils/UserTestUtils";
import { UserData } from "../../../types/user";
import { saveHallToDb } from "../../testUtils/hallTestUtils";
import { SeatStatus } from "@prisma/client";

describe("Seat Routes Integration Test - deleteSeat", () => {
    let adminData: UserData;
    let hallManagerData: UserData;
    let hall: any;
    let seat: any;

    const roles = [
        { name: "Admin", token: () => adminData.token },
        { name: "HallManager", token: () => hallManagerData.token },
    ];

    beforeAll(async () => {
        adminData = await seedAdminAndGetToken();
        hallManagerData = await seedHallManagerAndGetToken();
    });

    afterAll(async () => {
        await prisma.user.deleteMany({ where: { id: adminData.user.id } });
        await prisma.user.deleteMany({ where: { id: hallManagerData.user.id } });
    });

    beforeEach(async () => {
        hall = await saveHallToDb();
        seat = await saveSeatToDb(buildSeatData(hall.id));
    });

    afterEach(async () => {
        await prisma.seat.deleteMany({ where: { hallId: hall.id } });
        await prisma.hall.deleteMany({ where: { id: hall.id } });
    });

    describe("deleteSeat with invalid id", () => {
        roles.forEach(({ name, token }) => {
            it(`returns 400 for ${name} token`, async () => {
                const res = await request(app)
                    .delete("/api/seat/delete/invalid-id")
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(400);
            });
        });
    });

    describe("deleteSeat successfully", () => {
        roles.forEach(({ name, token }) => {
            it(`${name} can delete seat`, async () => {
                const res = await request(app)
                    .delete(`/api/seat/delete/${seat.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Deleted successfully");

                const deletedSeat = await prisma.seat.findUnique({ where: { id: seat.id } });
                expect(deletedSeat?.deletedAt).not.toBeNull();
                expect(deletedSeat?.status).toBe(SeatStatus.PERMANENTLY_REMOVED);
            });
        });
    });

    describe("deleteSeat already deleted/not found", () => {
        beforeEach(async () => {
            await prisma.seat.update({
                where: { id: seat.id },
                data: { deletedAt: new Date() },
            });
        })

        roles.forEach(({ name, token }) => {
            it(`returns 404 for ${name} token if seat already deleted`, async () => {
                const res = await request(app)
                    .delete(`/api/seat/delete/${seat.id}`)
                    .set("Authorization", `Bearer ${token()}`);

                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Seat Not Found");
            });
        });
    });
});
