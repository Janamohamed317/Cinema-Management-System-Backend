import { Role } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { UserRegisterationBody } from "../types/auth"
import { hashPassword } from "../utils/hash"
import { NotFoundError, BadRequestError, ConflictError, ForbiddenError, UnauthorizedError } from "../utils/error"
import { validateUserCreation, validateLogin } from "../utils/validations/userValidations"
import { comparePassword } from "../services/authServices"

export const findUserByEmailOrUsername = async (email: string, username: string) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    })
}

export const checkEmailExistance = async (email: string) => {
    return await prisma.user.findUnique({ where: { email: email } })
}

export const CreateUser = async (data: UserRegisterationBody, role: Role) => {
    const hashedPassword = await hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            role
        },
    });
    return newUser
}

export const signupUserService = async (data: UserRegisterationBody) => {
    const { error } = validateUserCreation(data);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const { email, username } = data;
    const user = await findUserByEmailOrUsername(email, username);
    if (user) {
        throw new ConflictError("User Already exists");
    }

    return await CreateUser(data, Role.USER);
}

export const registerEmployeeService = async (data: UserRegisterationBody) => {
    const { error } = validateUserCreation(data)
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const { email } = data
    const user = await checkEmailExistance(email)
    if (user) {
        throw new ConflictError("Employee Already exist")
    }

    return await CreateUser(data, Role.UNASSIGNED);
}

export const assignRoleService = async (userId: string, role: Role) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
        throw new NotFoundError("User Not Found")
    }

    if (user.role != Role.UNASSIGNED) {
        throw new ForbiddenError("Can't Assign That Type of User")
    }

    const result = await prisma.user.updateMany({
        where: { id: userId, role: Role.UNASSIGNED },
        data: { role }
    });

    if (result.count === 0) {
        throw new ConflictError("User cannot be assigned a role (already assigned)");
    }

    return user
}

export const signinUserService = async (data: { email: string; password: string }) => {
    const { error } = validateLogin(data);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const { email, password } = data;

    const user = await checkEmailExistance(email);
    if (!user) {
        throw new NotFoundError("Email or Password is incorrect");
    }

    const isMatched = await comparePassword(user, password);
    if (!isMatched) {
        throw new UnauthorizedError("Email or Password is incorrect");
    }

    return user;
}