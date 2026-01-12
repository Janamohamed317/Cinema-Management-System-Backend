const asyncHandler = require("express-async-handler");
const { validateHallId, validateHallData, validateHallUpdate } = require("../utils/validations/hallValidation");
const { PrismaClient } = require('../generated/prisma');
const { findHallByName } = require("../services/hallServices");


const prisma = new PrismaClient();


const addHall = asyncHandler(async (req, res) => {
    const { error } = validateHallData(req.body)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const { name, type, screenType, seats } = req.body

    const hall = await findHallByName(name)
    if (hall) {
        if (hall.deletedAt == null) {
            return res.status(409).json("Hall with the Same Name Already Exists")
        }
        else {
            return res.status(400)
                .json({ message: `Hall ${hall.name} exists but is deleted. Please restore it instead of creating a new one.` })
        }
    }
    await prisma.hall.create({ data: { name, type, screenType, seats } })
    return res.status(201).json({ message: `Hall ${name} is Created Successfully` })
})

const deleteHall = asyncHandler(async (req, res) => {
    const { error } = validateHallId(req.params.id)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const { id } = req.query

    const result = await prisma.hall.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date() } })

    if (result.count === 0) {
        return res.status(404).json({ message: "Hall Not Found" })
    }
    return res.status(200).json({ message: "Deleted successfully" })
})

const editHall = asyncHandler(async (req, res) => {
    const { error: idError } = validateHallId(req.params.id)
    if (idError) {
        return res.status(400).json({ message: idError.details[0].message })
    }

    const { error } = validateHallUpdate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    const { id } = req.params
    const { name, type, screenType, seats } = req.body

    const result = await prisma.hall.updateMany({ where: { id, deletedAt: null }, data: { name, type, screenType, seats } })

    if (result.count === 0) {
        return res.status(404).json({ message: "Hall not found or deleted" })
    }

    return res.status(200).json({ message: "Hall updated successfully" })
})

const restoreHall = asyncHandler(async (req, res) => {
    const { error } = validateHallId(req.params.id)
    if (error) return res.status(400).json({ message: error.details[0].message })

    const { id } = req.params

    const result = await prisma.hall.updateMany({ where: { id, deletedAt: { not: null } }, data: { deletedAt: null } })

    if (result.count === 0) {
        return res.status(404).json({ message: "Hall Not Found" })
    }

    return res.status(200).json({ message: `Hall Restored Successfully` })
})

const getAllHalls = asyncHandler(async (req, res) => {
    const halls = await prisma.hall.findMany({ where: { deletedAt: null } })

    return res.status(200).json(halls)
})

module.exports = {
    addHall,
    deleteHall,
    editHall,
    restoreHall,
    getAllHalls
}