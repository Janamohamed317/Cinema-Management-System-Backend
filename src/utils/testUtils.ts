import { Role } from "@prisma/client";
import { prisma } from "../prismaClient/client";
import { hashPassword } from "./hash";
import { tokenCreation } from "./tokenCreation";

export const authTestUser = {
    email: "testuser@example.com",
    username: "testuser",
    password: "Password123!@#",
};

export const EmpTestUser = {
    email: "empuser@example.com",
    username: "emp",
    password: "Password123!@#",
};


export const fakeUser = {
    email: "fakeuser@example.com",
    username: "fakeuser",
    password: "Password123!@#",
};

export const seedAdminAndGetToken = async () => {
    const admin = await prisma.user.create({
        data: {
            email: "admin@test.com",
            username: "admin",
            password: await hashPassword("password"),
            role: Role.SUPER_ADMIN,
        },
    });

    return tokenCreation(admin)

}