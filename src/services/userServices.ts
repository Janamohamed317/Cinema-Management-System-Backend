import { Role } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { UserRegisterationBody } from "../types/auth"
import { hashPassword } from "../utils/hash"

export const findUserByEmailOrUsername = async (email: string, username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    })
    if (user) {
        return user
    }
    return null
}

export const checkEmailExistance = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email: email } })
    if (user) {
        return user
    }
    return null
}

export const CreateUser = async (data: UserRegisterationBody, role: Role) => {
    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            role
        },
    });
    return newUser
}

export const signupUser = (data: UserRegisterationBody) => {
    return CreateUser(data, Role.USER);
}

export const registerEmployee = (data: UserRegisterationBody) => {
    return CreateUser(data, Role.UNASSIGNED);
}

export const assignRole = async (userId: string, role: Role) => {
    return await prisma.user.updateMany({
        where: { id: userId, role: Role.UNASSIGNED },
        data: { role }
    });
}