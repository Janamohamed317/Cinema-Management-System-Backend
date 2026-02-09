import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { tokenCreation } from "../utils/tokenCreation";
import { signupUserService, signinUserService } from "../services/userServices";
import { UserRegisterationBody, UserSigninBody } from "../types/auth";

export const signup = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const newUser = await signupUserService(req.body)
    const token = tokenCreation(newUser);
    res.status(201).json({ newUser, token });
});

export const signin = asyncHandler(async (req: Request<{}, {}, UserSigninBody>, res: Response) => {
    const user = await signinUserService(req.body);
    const token = tokenCreation(user);
    res.status(200).json({ userId: user.id, token });
});
