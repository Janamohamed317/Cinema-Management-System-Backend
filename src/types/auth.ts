import { Request } from "express"
import { Role } from "../generated/prisma"

export type UserRegisterationBody = {
    email: string
    username: string
    password: string
}

export type UserSigninBody = {
    email: string
    password: string
}


export interface AuthRequest extends Request {
    user?: {
        id: string,
        role: Role
    }
}