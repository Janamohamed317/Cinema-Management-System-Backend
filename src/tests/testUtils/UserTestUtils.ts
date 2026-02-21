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
    const user = await prisma.user.create({
        data: {
            email: `admin${randomUUID()}@test.com`,
            username: `admin${randomUUID()}`,
            password: await hashPassword("password"),
            role: Role.SUPER_ADMIN,
        },
    });
    const token = tokenCreation(user);
    return { token, user };

}

export const seedUserAndGetToken = async () => {
    const fakeUser = buildFakeUser();
    const user = await prisma.user.create({
        data: {
            ...fakeUser,
            password: await hashPassword(fakeUser.password),
        },
    });
    const token = tokenCreation(user);
    return { token, user };
}




