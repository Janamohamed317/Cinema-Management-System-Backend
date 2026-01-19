import { Role } from "../generated/prisma";


export type AssignRoleBody = {
    userId: string,
    role: Role
}

