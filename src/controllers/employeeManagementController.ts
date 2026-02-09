import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AssignRoleBody } from "../types/user";
import { UserRegisterationBody } from "../types/auth";
import { validateAssignedEmployee } from "../utils/validations/employeeManagementValidations";
import { assignRoleService, registerEmployeeService } from "../services/userServices";
import { BadRequestError } from "../utils/error";

export const AssignRole = asyncHandler(async (req: Request<{}, {}, AssignRoleBody>, res: Response) => {
    const { error } = validateAssignedEmployee(req.body)
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const { role, userId } = req.body
    const user = await assignRoleService(userId, role)
    res.status(200).json({ message: `${role} is Assigned to ${user.username}` })
})

export const EmployeeRegister = asyncHandler(async (req: Request<{}, {}, UserRegisterationBody>, res: Response) => {
    const newUser = await registerEmployeeService(req.body)
    res.status(201).json({ newUser })
})
