import { User } from "@prisma/client";
import bcrypt from "bcrypt"

export const comparePassword = async (user: User, password: string) => {

    const isMatched = await bcrypt.compare(password, user.password);
    return isMatched
}


export const sendVerificationEmail = () => {
    // to do
}
