import rateLimit from "express-rate-limit"
import app from "../app";


export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later"
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many attempts, please try again after 15 minutes"
});