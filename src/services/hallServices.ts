import { Hall } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { HallAddingBody, HallEditingBody } from "../types/hall"

export const findHallByName = async (name: string) => {
    const hall = await prisma.hall.findFirst({
        where: { name },
    })

    if (hall) {
        return hall
    }

    return null
}

export const findHallById = async (id: string) => {
    const hall = await prisma.hall.findFirst({
        where: { id },
    })

    if (hall) {
        return hall
    }

    return null
}

export const addHallService = async (data: HallAddingBody) => {
    return await prisma.hall.create({
        data,
    })
}

export const softDeleteHallById = async (id: string) => {
    return await prisma.hall.updateMany({
        where: {
            id,
            deletedAt: null,
        },
        data: {
            deletedAt: new Date(),
        },
    })
}

export const editHallById = async (id: string, data: HallEditingBody) => {
    return await prisma.hall.updateMany({
        where: {
            id,
            deletedAt: null,
        },
        data,
    })
}

export const restoreHallById = async (id: string) => {
    return await prisma.hall.updateMany({
        where: {
            id,
            deletedAt: { not: null },
        },
        data: {
            deletedAt: null,
        },
    })
}

export const getAllActiveHalls = async () => {
    return await prisma.hall.findMany({
        where: {
            deletedAt: null,
        },
    })
}

export const getHallConflictInfo = (hall: Hall): boolean => {
    let isDeleted

    if (hall.deletedAt !== null) {
        isDeleted = true
    } else {
        isDeleted = false
    }

    return isDeleted
}
