import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/error"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        })
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message,
        })
    }

    if (err.name === "PrismaClientKnownRequestError") {
        return res.status(400).json({
            message: "Database error",
        })
    }

    console.error("Unexpected error:", err)
    return res.status(500).json({
        message: "Internal server error",
    })
}