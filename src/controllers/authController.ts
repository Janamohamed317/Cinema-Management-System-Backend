import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../utils/hash";
import { tokenCreation } from "../utils/tokenCreation";
import { findUserByEmailOrUsername, checkEmailExistance } from "../services/userServices";
import { validateUserCreation, validateLogin } from "../utils/validations/userValidations";
import { PrismaClient, Role } from "../generated/prisma";
import { UserRegisterationBody, UserSigninBody } from "../types/auth";
import { comparePassword } from "../services/authServices";

const prisma = new PrismaClient();


export const signup = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const { error } = validateUserCreation(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return
    }
    const { email, username, password } = req.body;

    const user = await findUserByEmailOrUsername(email, username);
    if (user) {
        res.status(409).json({ message: "User Already exists" });
        return
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: Role.USER,
        },
    });

    const token = tokenCreation(newUser);

    //   sendVerificationEmail(); 

    res.status(201).json({ newUser, token });
});



export const signin = asyncHandler(async (req: Request<{}, {}, UserSigninBody>, res: Response) => {
    const { error } = validateLogin(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return
    }
    const { email, password } = req.body;

    const user = await checkEmailExistance(email);
    if (!user) {
        res.status(404).json({ message: "Email or Password is incorrect" });
        return
    }

    const isMatched = await comparePassword(user, password);
    if (!isMatched) {
        res.status(404).json({ message: "Email or Password is incorrect" });
        return
    }


    // if (!user.verified) {
    //   sendVerificationEmail(user);
    //    res.status(400).json({ message: "Email is not verified, please check your email" });
    //    return
    // }

    const token = tokenCreation(user);

    res.status(200).json({ userId: user.id, token });
    return
});


