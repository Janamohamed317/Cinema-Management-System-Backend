import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import { transporter } from "../utils/mailer";

export const comparePassword = async (user: User, password: string) => {
    const isMatched = await bcrypt.compare(password, user.password);
    return isMatched
}

export const sendVerificationEmail = async (to: string, subject: "Email Verification for MovieNest", html: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
    })
}
