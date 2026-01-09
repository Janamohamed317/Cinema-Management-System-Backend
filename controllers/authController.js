const asyncHandler = require("express-async-handler");
const { comparePassword, sendVerificationEmail } = require("../services/authServices");
const { hashPassword } = require("../utils/hash");
const { tokenCreation } = require("../utils/tokenCreation");
const { findUserByEmailOrUsername, checkEmailExistance } = require("../services/userServices");
const { validateUserCreation, validateLogin } = require("../utils/validations/userValidations");
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();


const signup = asyncHandler(async (req, res) => {
    const { error } = validateUserCreation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, username, password } = req.body;

    const user = await findUserByEmailOrUsername(email, username);
    if (user) {
        return res.status(409).json({ message: "User Already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: "USER",
        },
    });

    const token = tokenCreation(newUser);

    //   sendVerificationEmail(); 

    return res.status(201).json({ newUser, token });
});

const signin = asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await checkEmailExistance(email);
    if (!user) {
        return res.status(404).json({ message: "Email or Password is incorrect" });
    }

    const isMatched = await comparePassword(email, password);
    if (!isMatched) {
        return res.status(404).json({ message: "Email or Password is incorrect" });
    }

    // Optional: email verification check
    // if (!user.verified) {
    //   sendVerificationEmail(user);
    //   return res.status(400).json({ message: "Email is not verified, please check your email" });
    // }

    const token = tokenCreation(user);

    return res.status(200).json({ userId: user.id, token });
});

module.exports = {
    signup,
    signin,
};
