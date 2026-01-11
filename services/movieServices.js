const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const findMovieByName = async (name) => {
    const movie = await prisma.movie.findFirst({ where: { name } })
    if (movie) {
        return movie
    }
    return null
}

const findMovieById = async (id) => {
    const movie = await prisma.movie.findFirst({ where: { id } })
    if (movie) {
        return movie
    }
    return null
}

module.exports = {
    findMovieByName,
    findMovieById
}