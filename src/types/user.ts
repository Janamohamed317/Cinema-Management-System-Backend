import { Role } from "@prisma/client"


export type AssignRoleBody = {
    userId: string,
    role: Role
}

