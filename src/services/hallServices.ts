import { Hall } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { HallAddingBody, HallEditingBody } from "../types/hall"
import { NotFoundError, BadRequestError, ConflictError } from "../utils/error"
import { validateHallData, validateHallId, validateHallUpdate } from "../utils/validations/hallValidation"

export const findHallByName = async (name: string): Promise<Hall | null> => {
    return await prisma.hall.findFirst({ where: { name } })
}

export const findHallById = async (id: string): Promise<Hall | null> => {
    return await prisma.hall.findFirst({ where: { id } })
}

export const addHallService = async (data: HallAddingBody) => {
    const { error } = validateHallData(data)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const hall = await findHallByName(data.name)
    if (hall) {
        const isDeleted = isHallDeleted(hall)
        if (!isDeleted) {
            throw new ConflictError("Hall with the Same Name Already Exists")
        }
        throw new ConflictError(`Hall ${hall.name} exists but is deleted. Please restore it instead of creating a new one.`)
    }

    return await prisma.hall.create({ data })
}

export const softDeleteHallService = async (id: string) => {
    const { error } = validateHallId(id)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const result = await prisma.hall.updateMany({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
    })

    if (result.count === 0) {
        throw new NotFoundError("Hall Not Found")
    }
}

export const editHallService = async (id: string, data: HallEditingBody) => {
    const { error: idError } = validateHallId(id)
    if (idError) {
        throw new BadRequestError(idError.details[0].message)
    }

    const { error } = validateHallUpdate(data)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const result = await prisma.hall.updateMany({
        where: { id, deletedAt: null },
        data,
    })

    if (result.count === 0) {
        throw new NotFoundError("Hall not found or deleted")
    }
}

export const restoreHallService = async (id: string) => {
    const { error } = validateHallId(id)
    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const result = await prisma.hall.updateMany({
        where: { id, deletedAt: { not: null } },
        data: { deletedAt: null },
    })

    if (result.count === 0) {
        throw new NotFoundError("Hall Not Found")
    }
}

export const getAllActiveHalls = async () => {
    return await prisma.hall.findMany({
        where: { deletedAt: null },
    })
}

export const isHallDeleted = (hall: Hall): boolean => {
    return hall.deletedAt !== null
}
