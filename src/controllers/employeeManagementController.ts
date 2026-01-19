import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient, Role } from "../generated/prisma";
import { AssignRoleBody } from "../types/user";
import { UserRegisterationBody } from "../types/auth";
import { validateAssignedEmployee } from "../utils/validations/employeeManagementValidations";
import { validateUserCreation } from "../utils/validations/userValidations";
import { hashPassword } from "../utils/hash";
import { checkEmailExistance } from "../services/userServices";

const prisma = new PrismaClient()


export const AssignRole = asyncHandler(async (req: Request<{}, {}, AssignRoleBody>, res: Response) => {

    const { error } = validateAssignedEmployee(req.body)

    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return
    }
    const { role, userId } = req.body

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        res.status(404).json({ message: "User Not Found" })
        return
    }

    if (user.role != Role.UNASSIGNED) {
        res.status(403).json({ message: "Can't Assign That Type of User" })
        return
    }

    const result = await prisma.user.updateMany({
        where: { id: userId, role: Role.UNASSIGNED },
        data: { role }
    });

    if (result.count === 0) {
        res.status(403).json({ message: "User cannot be assigned a role (already assigned)" });
        return
    }

    res.status(200).json({ message: `${role} is Assigned to ${user.username}` })
    return
})


export const EmployeeRegister = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const { error } = validateUserCreation(req.body)
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return
    }
    const { email, password, username } = req.body
    const user = await checkEmailExistance(email)
    if (user) {
        res.status(409).json({ message: "Employee Already exist" })
        return
    }
    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            role: Role.UNASSIGNED,
        },
    });

    res.status(201).json({ newUser })
    return
})



