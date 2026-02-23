import http from "http";
import app from "../app";
import { Server } from "socket.io";
import { getScreeningSnapshot } from "./screeningSnapshot";
import { getHoldSeatSnapshot, manualSeatRelease } from "./socketSeatServices";

const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

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

    socket.on("seat:hold", async ({ screeningId, seatId, userId }) => {
        if (!screeningId || !seatId || !userId) {
            socket.emit("seat:holdFailed", { seatId, reason: "INVALID" });
            return;
        }

        const roomName = `screening:${screeningId}`;

        try {
            const hold = await getHoldSeatSnapshot(screeningId, seatId, userId);

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
            const code = err?.code;

            if (code === "P2002") {
                socket.emit("seat:holdFailed", { seatId, reason: "TAKEN" });
                return;
            }

            if (code === "P2003") {
                socket.emit("seat:holdFailed", { seatId, reason: "INVALID" });
                return;
            }

            console.error("seat:hold error:", err);
            socket.emit("seat:holdFailed", { seatId, reason: "SERVER_ERROR" });
        }
    });

    socket.on("seat:release", async ({ screeningId, seatId, userId }) => {
        if (!screeningId || !seatId || !userId) {
            socket.emit("seat:releaseFailed", { seatId, reason: "INVALID" });
            return;
        }

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

    socket.on("disconnect", (reason) => {
        console.log("socket disconnected:", socket.id, reason);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});