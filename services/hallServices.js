const { PrismaClient } = require('../generated/prisma');


const prisma = new PrismaClient();


const findHallByName = async (name) => {
    const hall = await prisma.hall.findFirst({ where: { name } })

    if (!hall) {
        return null
    }
    return hall
}

const findhallById = async (id) => {
    const hall = await prisma.hall.findFirst({ where: { id } })
    
    if (!hall) {
        return null
    }
    return hall
}

module.exports = {
    findHallByName,
    findhallById
}