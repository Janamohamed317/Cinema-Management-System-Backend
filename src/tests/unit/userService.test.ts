import { assignRole, checkEmailExistance, CreateUser, findUserByEmailOrUsername, registerEmployee, signupUser } from "../../services/userServices"
import { prisma } from "../../prismaClient/client"
import { hashPassword } from "../../utils/hash"
import { Role } from "@prisma/client"
import { buildFakeUser } from "../testUtils/UserTestUtils"

jest.mock("../../utils/hash")
jest.mock("../../prismaClient/client")


describe("User Services Unit Test", () => {
    const fakeUser = buildFakeUser()
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("findUserByEmailOrUsername", () => {
        it("returns the user when it exists", async () => {
            const user = { email: "user@email.com", username: "user" };
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(user)

            const result = await findUserByEmailOrUsername(user.email, user.username)

            expect(result).toEqual(user)
        })

        it("returns null when the uesr does not exist", async () => {
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findUserByEmailOrUsername("email", "username")

            expect(result).toBe(null)
        })
    })

    describe("checkEmailExistance", () => {
        it("returns the user when Email exists", async () => {
            const user = { email: "user@email.com" };
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(user)

            const result = await checkEmailExistance(user.email)

            expect(result).toEqual(user)
        })

        it("returns null when the Email does not exist", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

            const result = await checkEmailExistance("email")

            expect(result).toBeNull()
        })
    })

    it("Create User", async () => {
     
        const createdUser = { id: "2", role: "USER", ...fakeUser, password: "hashedPassword" }

        const testUserWithHashedPassword = { ...fakeUser, password: "hashedPassword", role: "USER" };

        (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
        (prisma.user.create as jest.Mock).mockResolvedValue(createdUser)

        const result = await CreateUser(fakeUser, Role.USER)

        expect(result).toEqual(createdUser)
        expect(prisma.user.create).toHaveBeenCalledWith({ data: testUserWithHashedPassword })
        expect(hashPassword).toHaveBeenCalledWith(fakeUser.password)
    })

    describe("assignRole", () => {
        it("successfully assigns role to an unassigned user", async () => {
            (prisma.user.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

            const result = await assignRole("user-1", Role.MOVIES_MANAGER);

            expect(prisma.user.updateMany).toHaveBeenCalledWith({
                where: { id: "user-1", role: Role.UNASSIGNED },
                data: { role: Role.MOVIES_MANAGER },
            });

            expect(result.count).toBe(1);
        });

        it("does not assign role if user already has a role", async () => {
            (prisma.user.updateMany as jest.Mock).mockResolvedValue({ count: 0 });
            const result = await assignRole("user-123", Role.MOVIES_MANAGER);
            expect(prisma.user.updateMany).toHaveBeenCalledWith({
                where: { id: "user-123", role: Role.UNASSIGNED },
                data: { role: Role.MOVIES_MANAGER },
            });

            expect(result.count).toBe(0);
        });
    });

})