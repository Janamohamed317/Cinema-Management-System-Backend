import { PrismaClient } from '../generated/prisma'
const prisma = new PrismaClient();

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
    const user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
        return user
    }
    return null
}
