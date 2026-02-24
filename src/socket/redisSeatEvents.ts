import IORedis from "ioredis";
import type { Server } from "socket.io";
import { ReleasedSeat } from "../types/seat";

const CHANNEL = "seat:released";

export function setupSeatReleaseSubscriber(io: Server) {
    const sub = new IORedis(process.env.REDIS_URL!);

    sub.on("error", (err) => {
        console.error("[redis subscriber error]", err);
    });

    sub.subscribe(CHANNEL, (err) => {
        if (err) console.error(`[redis] subscribe failed: ${CHANNEL}`, err);
        else console.log(`Redis subscribed to ${CHANNEL}`);
    });

    sub.on("message", (channel, message) => {
        if (channel !== CHANNEL) return;

        let released: ReleasedSeat[];
        try {
            released = JSON.parse(message);
        } catch {
            console.error("[redis] bad JSON:", message);
            return;
        }

        const byScreening = new Map<string, string[]>();
        for (const item of released) {
            if (!byScreening.has(item.screeningId)) byScreening.set(item.screeningId, []);
            byScreening.get(item.screeningId)!.push(item.seatId);
        }

        for (const [screeningId, seatIds] of byScreening.entries()) {
            io.to(`screening:${screeningId}`).emit("seat:released", { seatIds });
        }
    });
}