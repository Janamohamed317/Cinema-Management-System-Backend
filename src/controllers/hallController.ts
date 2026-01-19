import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

import { validateHallId, validateHallData, validateHallUpdate } from "../utils/validations/hallValidation"

import { findHallByName, addHallService, softDeleteHallById, editHallById, restoreHallById, getAllActiveHalls, getHallConflictInfo }
    from "../services/hallServices"

import { HallAddingBody, HallEditinggBody } from "../types/hall"


export const addHall = asyncHandler(async (req: Request<{}, {}, HallAddingBody>, res: Response) => {
    const { error } = validateHallData(req.body)

    if (error) {
        res.status(400).json({ message: error.details[0].message })        
        return
    }

    const body = req.body

    const hall = await findHallByName(body.name)

    if (hall) {
        const isDeleted = getHallConflictInfo(hall)

        if (!isDeleted) {
            res.status(409).json("Hall with the Same Name Already Exists")
            return
        }

        res.status(400).json({
            message: `Hall ${hall.name} exists but is deleted. Please restore it instead of creating a new one.`,
        })
        return
    }

    await addHallService(body)

    res.status(201).json({
        message: `Hall ${body.name} is Created Successfully`,
    })
    return
})

export const deleteHall = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateHallId(req.params.id)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params

    const result = await softDeleteHallById(id)

    if (result.count === 0) {
        res.status(404).json({ message: "Hall Not Found" })
        return
    }

    res.status(200).json({ message: "Deleted successfully" })
    return
})

export const editHall = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error: idError } = validateHallId(req.params.id)

    if (idError) {
        res.status(400).json({ message: idError.details[0].message })
        return
    }

    const { error } = validateHallUpdate(req.body)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params
    const body = req.body as HallEditinggBody

    const result = await editHallById(id, body)

    if (result.count === 0) {
        res.status(404).json({ message: "Hall not found or deleted" })
        return
    }

    res.status(200).json({ message: "Hall updated successfully" })
    return
})

export const restoreHall = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const { error } = validateHallId(req.params.id)

    if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
    }

    const { id } = req.params

    const result = await restoreHallById(id)

    if (result.count === 0) {
        res.status(404).json({ message: "Hall Not Found" })
        return
    }

    res.status(200).json({ message: "Hall Restored Successfully" })
    return
})

export const getAllHalls = asyncHandler(async (req: Request, res: Response) => {
    const halls = await getAllActiveHalls()
    res.status(200).json(halls)
    return

})
