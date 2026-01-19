import jwt from "jsonwebtoken"
import { User } from "../generated/prisma";


export const tokenCreation = (user: User) => {
    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in environment variables");
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY)
    return token
}
