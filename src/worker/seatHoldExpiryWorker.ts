import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { cleanupExpiredHolds } from "../socket/socketSeatServices";


const connection = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});
connection.on("error", (err) => console.error("[redis worker error]", err));

const QUEUE = "seat-hold-expiry";
const CHANNEL = "seat:released";

async function main() {
    const queue = new Queue(QUEUE, { connection });

    await queue.add(
        "cleanup-expired-holds",
        {},
        { repeat: { every: 5000 }, removeOnComplete: true, removeOnFail: true }
    );

    new Worker(
        QUEUE,
        async () => {
            const released = await cleanupExpiredHolds();
            if (released.length === 0) return;

            await connection.publish(CHANNEL, JSON.stringify(released));
        },
        { connection }
    );

    console.log("SeatHold expiry worker running");
}

main().catch((e) => {
    console.error("Worker failed:", e);
    process.exit(1);
});