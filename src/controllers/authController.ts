import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { tokenCreation } from "../utils/tokenCreation";
import { signupUserService, signinUserService, markUserAsVerified } from "../services/userServices";
import { UserRegisterationBody, UserSigninBody, verifyEmailData } from "../types/auth";
import { verifyOTP } from "../services/otpServices"
import { BadRequestError } from "../utils/error";


export const signup = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const newUser = await signupUserService(req.body)
    const token = tokenCreation(newUser);
    res.status(201).json({ userId: newUser.id, token, message: "Verification Email Sent" });
});

export const signin = asyncHandler(async (req: Request<{}, {}, UserSigninBody>, res: Response) => {
    const user = await signinUserService(req.body);
    const token = tokenCreation(user);
    res.status(200).json({ userId: user.id, token });
});


export const verifyEmail = asyncHandler(async (req: Request<{}, {}, verifyEmailData>, res: Response) => {
    const { email, otp } = req.body;
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
        throw new BadRequestError("Invalid or expired OTP");
    }
    await markUserAsVerified(email);
    res.status(200).json({ message: "Email verified successfully" });
});