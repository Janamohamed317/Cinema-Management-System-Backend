import { randomUUID } from "node:crypto";
import { prisma } from "../../prismaClient/client";
import { hashPassword } from "../../utils/hash";
import { Role } from "@prisma/client";
import { tokenCreation } from "../../utils/tokenCreation";

export const buildMovieData = () => ({
    name: `movie-${randomUUID()}`,
    duration: 250
});

export const seedMovieManagerAndGetToken = async () => {
    const movieManager = await prisma.user.create({
        data: {
            email: `HallManager${randomUUID()}@test.com`,
            username: `hallManager${randomUUID()}`,
            password: await hashPassword("password"),
            role: Role.MOVIES_MANAGER,
        },
    });

    const token = tokenCreation(movieManager);
    return { token, movieManager }
}