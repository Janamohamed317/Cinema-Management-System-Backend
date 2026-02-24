import http from "http";
import app from "../app";
import { Server } from "socket.io";
import { holdSeatWithCheck, manualSeatRelease, getScreeningSnapshot, deleteHeldSeatsForUser, getHeldSeatsForUser } from "./socketSeatServices";
import { setupSeatReleaseSubscriber } from "./redisSeatEvents";
import { socketAuth } from './socketAuth';

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

io.use(socketAuth);
setupSeatReleaseSubscriber(io)

io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("screening:join", async ({ screeningId }) => {
        if (!screeningId) {
            socket.emit("screening:joinFailed", { reason: "INVALID" });
            return;
        }

        const roomName = `screening:${screeningId}`;
        socket.join(roomName);
        console.log(`👥 ${socket.id} joined ${roomName}`);

        try {
            const snapshot = await getScreeningSnapshot(screeningId);
            socket.emit("seats:snapshot", snapshot);
        } catch (err) {
            console.error("snapshot error:", err);
            socket.emit("snapshot:failed", { reason: "SERVER_ERROR" });
        }
    });

    socket.on("seat:hold", async ({ screeningId, seatId }) => {
        if (!screeningId || !seatId) {
            socket.emit("seat:holdFailed", { seatId, reason: "INVALID" });
            return;
        }
        const userId = socket.data.userId
        const roomName = `screening:${screeningId}`;

        try {
            const hold = await holdSeatWithCheck(screeningId, seatId, userId);
            socket.emit("seat:holdOk", {
                seatId: hold.seatId,
                expiresAt: hold.expiresAt,
            });

            io.to(roomName).emit("seat:held", {
                seatId: hold.seatId,
                userId: hold.userId,
                expiresAt: hold.expiresAt,
            });
        } catch (err: any) {
            console.error("seat:hold error:", err);
            const reason = err?.message || "SERVER_ERROR";

            if (reason === "SEAT_HELD" || reason === "SEAT_BOOKED") {
                socket.emit("seat:holdFailed", { seatId, reason });
                return;
            }
            socket.emit("seat:holdFailed", { seatId, reason: "SERVER_ERROR" });
        }
    });

    socket.on("seat:release", async ({ screeningId, seatId }) => {
        if (!screeningId || !seatId) {
            socket.emit("seat:releaseFailed", { seatId, reason: "INVALID" });
            return;
        }
        const userId = socket.data.userId
        const roomName = `screening:${screeningId}`;

        try {
            const result = await manualSeatRelease(screeningId, seatId, userId);

            if (result.count === 0) {
                socket.emit("seat:releaseFailed", { seatId, reason: "NOT_FOUND" });
                return;
            }

            socket.emit("seat:releaseOk", { seatId });
            io.to(roomName).emit("seat:released", { seatId });
        } catch (err: any) {
            console.error("seat:release error:", err);
            socket.emit("seat:releaseFailed", { seatId, reason: "SERVER_ERROR" });
        }
    });

    socket.on("disconnect", async (reason) => {
        console.log("socket disconnected:", socket.id, reason);

        const userId = socket.data.userId;
        if (!userId) return;

        const holds = await getHeldSeatsForUser(userId)

        if (holds.length === 0) return;

        await deleteHeldSeatsForUser(userId);

        const byScreening = new Map<string, string[]>();
        for (const hold of holds) {
            if (!byScreening.has(hold.screeningId)) {
                byScreening.set(hold.screeningId, []);
            }
            byScreening.get(hold.screeningId)!.push(hold.seatId);
        }

        for (const [screeningId, seatIds] of byScreening.entries()) {
            io.to(`screening:${screeningId}`).emit('seat:released', { seatIds });
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});