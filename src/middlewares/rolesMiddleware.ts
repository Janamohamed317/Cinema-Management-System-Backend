import { Request, Response, NextFunction } from "express";
import { Role } from "../generated/prisma";
import { AuthRequest } from "../types/auth";

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
