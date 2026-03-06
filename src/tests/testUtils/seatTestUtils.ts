
import { randomUUID } from "node:crypto";
import { prisma } from "../../prismaClient/client";
import { SeatAddingBody } from "../../types/seat";

export const buildSeatData = (hallId: string, seatNumber: string = "61f0c404-5cb3-11e7-907b-a6006ad3dba0"): SeatAddingBody => {
    return {
        hallId,
        seatNumber,
    };
};

export const saveSeatToDb = async (seatData: SeatAddingBody) => {
    return await prisma.seat.create({
        data: seatData,
    });
};

export const getSeatFromDb = async (seatNumber: string, hallId: string) => {
    return await prisma.seat.findUnique({
        where: {
            hallId_seatNumber: {
                hallId,
                seatNumber,
            },
        },
    });
};
