
import { prisma } from "../../prismaClient/client";
import { SeatAddingBody } from "../../types/seat";

export const buildSeatData = (hallId: string, seatNumber: number = 1): SeatAddingBody => {
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

export const getSeatFromDb = async (seatNumber: number, hallId: string) => {
    return await prisma.seat.findUnique({
        where: {
            hallId_seatNumber: {
                hallId,
                seatNumber,
            },
        },
    });
};
