jest.mock("bcrypt", () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));
import { hashPassword } from "../../utils/hash"
import bcrypt from "bcrypt"
import { calculateTicketPrice } from "../../utils/pricing";
import { HallType, ScreenType } from "@prisma/client";
import { buildScreeningDetails } from "../testUtils/screeningTestUtils";
import { BadRequestError } from "../../utils/error";


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

describe('calculateTicketPrice', () => {
    const testCases: [number, HallType, ScreenType, number][] = [
        [8, HallType.REGULAR, ScreenType.TWO_D, 120],
        [10, HallType.VIP, ScreenType.IMAX, 270],

        [12, HallType.REGULAR, ScreenType.THREE_D, 202.8],
        [18, HallType.VIP, ScreenType.SCREEN_X, 351],

        [19, HallType.REGULAR, ScreenType.IMAX, 270],
        [21, HallType.VIP, ScreenType.TWO_D, 270],
    ];

    it.each(testCases)(
        "returns correct price for hour %i, hall %s, screen %s",
        (hour, hall, screen, expected) => {
            const screening = buildScreeningDetails(hour, hall, screen);
            expect(calculateTicketPrice(screening)).toBe(expected);
        }
    );

    it("throws Error on invalid hall type", () => {
        const screening = buildScreeningDetails(10, "INVALID" as HallType, ScreenType.TWO_D);
        expect(() => calculateTicketPrice(screening)).toThrow(BadRequestError);
    });

    it("throws Error on invalid screen type", () => {
        const screening = buildScreeningDetails(10, HallType.REGULAR, "INVALID" as ScreenType);
        expect(() => calculateTicketPrice(screening)).toThrow(BadRequestError);
    });
});

