import { Role } from "../generated/prisma"
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

export const CreateUser = async (data: UserRegisterationBody) => {
    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            role: Role.USER,
        },
    });
    return newUser
}

export const assignRole = async (userId: string, role: Role) => {
    return await prisma.user.updateMany({
        where: { id: userId, role: Role.UNASSIGNED },
        data: { role }
    });
}