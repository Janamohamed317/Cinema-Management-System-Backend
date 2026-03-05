import IORedis from "ioredis";

export const redisClient = new IORedis(process.env.REDIS_URL!);

redisClient.on("connect", () => {
    console.log("Redis client connected for caching.");
});

redisClient.on("error", (err) => {
    console.error("[redis client error]", err);
});
