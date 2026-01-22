jest.mock("bcrypt", () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));
import { hashPassword } from "../../utils/hash"

import bcrypt from "bcrypt"


describe("hashPassword", () => {
    it("hash password and returns it", async () => {
        (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt");
        (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword")

        const result = await hashPassword("Password")

        expect(bcrypt.genSalt).toHaveBeenCalledWith(10)
        expect(bcrypt.hash).toHaveBeenCalledWith("Password", "salt")
        expect(result).toEqual("hashedPassword")

    })
})