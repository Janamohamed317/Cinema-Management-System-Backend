import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { tokenCreation } from "../utils/tokenCreation";
import { findUserByEmailOrUsername, checkEmailExistance, signupUser } from "../services/userServices";
import { validateUserCreation, validateLogin } from "../utils/validations/userValidations";
import { UserRegisterationBody, UserSigninBody } from "../types/auth";
import { comparePassword } from "../services/authServices";

export const signup = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const { error } = validateUserCreation(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return
    }
    const { email, username } = req.body;

    const user = await findUserByEmailOrUsername(email, username);
    if (user) {
        res.status(409).json({ message: "User Already exists" });
        return
    }

    const newUser = await signupUser(req.body)

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
        res.status(401).json({ message: "Email or Password is incorrect" });
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


