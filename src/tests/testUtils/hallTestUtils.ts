import { randomUUID } from "crypto";
import { hashPassword } from "../../utils/hash";
import { HallType, Role, ScreenType } from "@prisma/client";
import { tokenCreation } from "../../utils/tokenCreation";
import { prisma } from "../../prismaClient/client";

export const seedHallManagerAndGetToken = async () => {
    const hallManager = await prisma.user.create({
        data: {
            email: `HallManager${randomUUID()}@test.com`,
            username: `hallManager${randomUUID()}`,
            password: await hashPassword("password"),
            role: Role.HALL_MANAGER,
        },
    });

    const token = tokenCreation(hallManager);
    return { token, hallManager }
}

export const buildHallData = () => ({
    name: `hall-${randomUUID()}`,
    type: HallType.REGULAR,
    screenType: ScreenType.SCREEN_X,
    seats: 50,
});