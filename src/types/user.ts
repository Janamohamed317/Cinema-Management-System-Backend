import { Role, User } from "@prisma/client"


export type AssignRoleBody = {
    userId: string,
    role: Role
}

export type UserData = {
    token: string,
    user: User
}



