import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma";
import { AuthRequest } from "../types/auth";
import { tokenSchema } from "../utils/validations/tokenValidation";


export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const { error, value } = tokenSchema.validate(decoded);

        if (error) {
            return res.status(400).json({ message: error.details[0].message});
        }

        req.user = {
            id: value.id,
            role: value.role
        };

        next();
    } catch {
        return res.status(400).json({ message: "Invalid Token" });
    }
}


