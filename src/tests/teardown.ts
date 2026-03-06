import { redisClient } from "../utils/redisClient";
import { prisma } from "../prismaClient/client";

module.exports = async () => {
    await redisClient.quit();
    await prisma.$disconnect();
};