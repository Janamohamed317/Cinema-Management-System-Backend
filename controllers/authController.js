const { User } = require("../models/UserModel")
const { comparePassword, sendVerificationEmail } = require("../services/authServices")
const asyncHandler = require("express-async-handler")
const { hashPassword } = require("../utils/hash")
const { tokenCreation } = require("../utils/tokenCreation")
const { findUserByEmailOrUsername, checkEmailExistance } = require("../services/userServices")
const { validateUserCreation, validateLogin } = require("../utils/validations/userValidations")


const signup = asyncHandler(async (req, res) => {
    const { error } = validateUserCreation(req.body)
    const { email, username, password } = req.body

    if (error) return res.status(400).json({ message: error.details[0].message });


    const user = await findUserByEmailOrUsername(email, username)
    if (user) {
        return res.status(409).json({ message: "User Already exist" })
    }
    const hashedPassword = await hashPassword(password)

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
        role: "USER"
    })
    await newUser.save()
    const token = tokenCreation(newUser)
    sendVerificationEmail()
    return res.status(201).json({ newUser, token })
})

const signin = asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body)

    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body

    const user = await checkEmailExistance(email)

    let isMatched = false

    if (user) {
        isMatched = await comparePassword(email, password)
    }
    if (!isMatched || !user) {
        return res.status(404).json({ message: "Email or Password is incorrect" })
    }
    // if (!user.verified) {
    //     sendVerificationEmail()
    //     return res.status(400).json({ message: "Email is not verified, please check your email" })
    // }

    const token = tokenCreation(user)
    return res.status(200).json({ userId: user._id, token })


})


module.exports = {
    signin,
    signup,
}