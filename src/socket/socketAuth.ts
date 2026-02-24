import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error('Authentication required'));
    }
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY) as any;
        socket.data.userId = decoded.id;
        next();
    } catch (err) {
        console.log(err);

        next(new Error('Invalid token'));
    }
};
