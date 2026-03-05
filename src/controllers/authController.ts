import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { tokenCreation } from "../utils/tokenCreation";
import { signupUserService, signinUserService, markUserAsVerified } from "../services/userServices";
import { UserRegisterationBody, UserSigninBody, verifyEmailData } from "../types/auth";
import { sendVerificationEmail } from "../services/authServices";
import { verificationEmailTemplate } from "../utils/templates/verificationEmailTemplate";
import { VerificationEmailData } from "../types/emailData";
import { generateOTP, saveOTP } from "../services/otpServices";
import { verifyOTP } from "../services/otpServices"
import { BadRequestError, ForbiddenError } from "../utils/error";


export const signup = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const newUser = await signupUserService(req.body)
    const token = tokenCreation(newUser);
    const otp = generateOTP()
    await saveOTP(newUser.email, otp)
    const emailData: VerificationEmailData = {
        username: newUser.username,
        otp
    }
    const htmlContent = verificationEmailTemplate(emailData)
    await sendVerificationEmail(newUser.email, "Email Verification for MovieNest", htmlContent)
    res.status(201).json({ userId: newUser.id, token, message: "Verification Email Sent" });
});

export const signin = asyncHandler(async (req: Request<{}, {}, UserSigninBody>, res: Response) => {
    const user = await signinUserService(req.body);
    if (!user.verified) {
        const otp = generateOTP()
        await saveOTP(user.email, otp)
        const emailData: VerificationEmailData = {
            username: user.username,
            otp
        }
        const htmlContent = verificationEmailTemplate(emailData)
        await sendVerificationEmail(user.email, "Email Verification for MovieNest", htmlContent)
        throw new ForbiddenError("Account not verified. A verification email has been sent.")
    }
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