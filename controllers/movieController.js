const asyncHandler = require("express-async-handler")
const { findMovieByName, findMovieById } = require("../services/movieServices")
const { validateAddingMovie, validateMovieId, validateEditingMovie } = require("../utils/validations/movieValidation")
const { PrismaClient } = require('../generated/prisma');


const prisma = new PrismaClient();


const addMovie = asyncHandler(async (req, res) => {
    const { error } = validateAddingMovie(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { name, duration } = req.body
    const foundMovie = await findMovieByName(name)

    if (foundMovie) {

        if (foundMovie.deletedAt === null) {
            return res.status(409).json({ message: "Movie with the same name already exists" })
        }
        else {
            return res.status(403).json({
                message: `Movie "${name}" exists but is deleted. Please restore it instead of creating a new one.`
            });
        }
    }

    await prisma.movie.create({
        data: { name, duration },
    });

    return res.status(201).json({ message: `${movieName} is Added Successfully` })

})

const deleteMovie = asyncHandler(async (req, res) => {
    const { error } = validateMovieId(req.params)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { id } = req.params
    const result = await prisma.movie.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } })

    if (result.count === 0) {
        return res.status(404).json({ message: "Movie Not Found" })
    }
    return res.status(200).json({ message: "Deleted successfully" })
})

const editMovie = asyncHandler(async (req, res) => {
    const { error } = validateMovieId(req.params)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { id } = req.params
    const movie = await findMovieById(id)
    if (!movie) {
        return res.status(404).json({ message: "Movie Not Found" })
    }

    if (!error) {
        const { error } = validateEditingMovie(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })
    }
    const { name, duration } = req.body

    await prisma.movie.update({ where: { id }, data: { name, duration } })

    return res.status(200).json({ message: "Movie Updated Successfully" })


})

const restoreMovie = asyncHandler(async (req, res) => {
    const { error } = validateMovieId(req.params)
    if (error) return res.status(400).json({ message: error.details[0].message })
    const { id } = req.params
    const movie = await findMovieById(id)

    if (!movie) {
        return res.status(404).json({ message: "Movie Not Found" })
    }

    await prisma.movie.update({ where: { id }, data: { deletedAt: null } })

    return res.status(200).json({ message: `${movie.name} is Restored Successfully` })
})

const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await prisma.movie.findMany({ where: { deletedAt: null } })

    return res.status(200).json(movies)
})

module.exports = {
    addMovie,
    deleteMovie,
    editMovie,
    restoreMovie,
    getAllMovies
}