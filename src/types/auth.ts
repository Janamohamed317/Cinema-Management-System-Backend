import { Request } from "express"
import { Role } from "@prisma/client"
import { Role as RoleType } from "@prisma/client"

export type UserRegisterationBody = {
    email: string
    username: string
    password: string
}

export type UserSigninBody = {
    email: string
    password: string
}


export interface AuthRequest<P = any, ResBody = any, ReqBody = any, ReqQuery = any> extends Request<P, ResBody, ReqBody, ReqQuery> {
    user?: {
        id: string,
        role: Role
    }
}
