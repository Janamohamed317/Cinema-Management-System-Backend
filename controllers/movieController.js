const asyncHandler = require("express-async-handler")
const { findMovieByName } = require("../services/movieServices")
const { validateAddingMovie } = require("../utils/validations/movieValidation")
const { PrismaClient } = require('../generated/prisma');


const prisma = new PrismaClient();


const addMovie = asyncHandler(async (req, res) => {
    const { error } = validateAddingMovie(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { movieName, movieDuration } = req.body
    const foundMovie = await findMovieByName(movieName)

    if (foundMovie) {
        return res.status(409).json({ message: "Movie with the same name already exists" })
    }

    await prisma.movie.create({
        data: { name: movieName, duration: movieDuration },
    });

    return res.status(201).json({ message: `${movieName} is Added Successfully` })

})


module.exports = {
    addMovie,
}