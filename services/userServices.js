const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const findUserByEmailOrUsername = async (email, username) => {
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

const checkEmailExistance = async (email) => {
    const user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
        return user
    }
    return null
}

module.exports = {
    findUserByEmailOrUsername,
    checkEmailExistance,
}