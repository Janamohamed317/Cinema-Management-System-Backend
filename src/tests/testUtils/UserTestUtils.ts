import { Role } from "@prisma/client";
import { prisma } from "../../prismaClient/client";
import { hashPassword } from "../../utils/hash";
import { tokenCreation } from "../../utils/tokenCreation";
import { randomUUID } from "node:crypto";

export const buildEmployeeUser = () => ({
    email: `empuser-${randomUUID()}@example.com`,
    username: `emp-${randomUUID()}`,
    password: "Password123!@#",
});

export const buildFakeUser = () => ({
    email: `fakeuser-${randomUUID()}@example.com`,
    username: `fake-${randomUUID()}`,
    password: "Password123!@#",
});

export const seedAdminAndGetToken = async () => {
    const admin = await prisma.user.create({
        data: {
            email: `admin${randomUUID()}@test.com`,
            username: `admin${randomUUID()}`,
            password: await hashPassword("password"),
            role: Role.SUPER_ADMIN,
        },
    });
    const token = tokenCreation(admin);
    return { token, admin };

}


