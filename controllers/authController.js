const { User, validatUserCreation, validatLogin } = require("../models/UserModel")
const { checkUserExistance, comparePassword, sendVerificationEmail, checkEmailExistance } = require("../services/authServices")
const asyncHandler = require("express-async-handler")
const { hashPassword } = require("../utils/hash")
const { tokenCreation } = require("../utils/tokenCreation")

const signup = asyncHandler(async (req, res) => {
    const { error } = validatUserCreation(req.body)
    const { email, username, password } = req.body

    if (error) return res.status(400).json({ message: error.details[0].message });


    const user = await checkUserExistance(email, username)
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
    const { error } = validatLogin(req.body)

    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body

    const user = await checkUserExistance(email)
    console.log(user);


    let isMatched = false

    if (user) {
        isMatched = await comparePassword(email, password)
    }
    if (!isMatched || !user) {
        return res.status(404).json({ message: "Email or Password is incorrect" })
    }
    if (!user.verified) {
        sendVerificationEmail()
        return res.status(400).json({ message: "Email is not verified, please check your email" })

    }

    const token = tokenCreation(user)
    return res.status(200).json({ userId: user._id, token })


})

const EmployeeRegister = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body
    const user = await checkEmailExistance(email)
    if (user) {
        return res.status(409).json({ message: "Employee Already exist" })
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
    return res.status(201).json({ newUser, token })
})


module.exports = {
    signin,
    signup,
    EmployeeRegister

}