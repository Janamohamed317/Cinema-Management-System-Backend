const asyncHandler = require("express-async-handler");
const { hashPassword } = require("../utils/hash");
const { validateAssignedEmployee } = require("../utils/validations/EmployeeManagementValidations");
const { validateUserCreation } = require("../utils/validations/userValidations");
const { checkEmailExistance } = require("../services/userServices");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();


const AssignRole = asyncHandler(async (req, res) => { 
    const { error } = validateAssignedEmployee(req.body)

    if (error) return res.status(400).json({ message: error.details[0].message });

    const { role, userId } = req.body

    const user = await prisma.user.findFirst({ where: { id: userId } })
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    
    if (user.role != "UNASSIGNED") {
        return res.status(403).json({ message: "Can't Assign That Type of User" })
    }

    await prisma.user.update({
        where: { id: userId },
        data: { role }
    });

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

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: "UNASSIGNED",
        },
    });

    return res.status(201).json({ newUser })
})




module.exports = {
    AssignRole,
    EmployeeRegister
}