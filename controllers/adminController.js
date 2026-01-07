const asyncHandler = require("express-async-handler");
const { User } = require("../models/UserModel");
const { hashPassword } = require("../utils/hash");
const { validateAssignedEmployee } = require("../utils/validations/adminValidations");
const { validateUserCreation } = require("../utils/validations/userValidations");
const { checkEmailExistance } = require("../services/userServices");


const AssignRole = asyncHandler(async (req, res) => {
    const { error } = validateAssignedEmployee(req.body)

    if (error) return res.status(400).json({ message: error.details[0].message });

    const { role, userId } = req.body

    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    if (user.role != "UNASSIGNED") {
        return res.status(403).json({ message: "Can't Assign That Type of User" })
    }
    user.role = role

    await user.save()

    return res.status(200).json({ message: `${role} is Assigned to ${user.username}` })
})


const EmployeeRegister = asyncHandler(async (req, res) => {
    const { error } = validateUserCreation(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });

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
        role: "UNASSIGNED"
    })
    await newUser.save()

    return res.status(201).json({ newUser })
})




module.exports = {
    AssignRole,
    EmployeeRegister
}