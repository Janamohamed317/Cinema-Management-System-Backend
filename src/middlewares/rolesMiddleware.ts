import { Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import { AuthRequest } from "../types/auth";
import { BadRequestError, ForbiddenError } from "../utils/error";

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    if (req.user.role === Role.SUPER_ADMIN) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
}

export function requireMovieManagementAccess(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
    }
    if (req.user.role === Role.MOVIES_MANAGER || req.user.role === Role.SUPER_ADMIN) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
}

export function requireHallManagementAccess(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    if (req.user.role === Role.HALL_MANAGER || req.user.role === Role.SUPER_ADMIN) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
}


export function verifyUserOwnership(req: AuthRequest, res: Response, next: NextFunction) {
    const userIdFromBody = req.body?.ticketData?.userId || req.body?.userId;

    if (!userIdFromBody) {
        throw new BadRequestError("Please Login First")
    }

    if (userIdFromBody !== req.user!.id) {
        throw new ForbiddenError("Unauthorized Access")
    }

    next();
}