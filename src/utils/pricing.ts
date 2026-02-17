import { HallType, ScreenType } from "@prisma/client";
import { ScreeningDetails } from "../types/screening";
import { BadRequestError } from "./error";

export const HallFactor = new Map<HallType, number>([
    [HallType.REGULAR, 1],
    [HallType.VIP, 1.5]
]);

export const ScreenFactor = new Map<ScreenType, number>([
    [ScreenType.TWO_D, 1],
    [ScreenType.THREE_D, 1.3],
    [ScreenType.IMAX, 1.5],
    [ScreenType.SCREEN_X, 1.5],
]);

export const TimeFactor = new Map<number, number>([
    [1, 1],
    [2, 1.3],
    [3, 1.5],
]);

export const fixedPrice = 120

export const calculateTicketPrice = (screening: ScreeningDetails) => {
    let timeFactor = TimeFactor.get(3);
    const hour = new Date(screening.startTime).getUTCHours();

    if (hour < 12) {
        timeFactor = TimeFactor.get(1);
    } else if (hour <= 18) {
        timeFactor = TimeFactor.get(2);
    }

    if (!timeFactor) {
        throw new BadRequestError("Invalid time factor for the given hour");
    }

    const hallFactor = HallFactor.get(screening.hall.type);
    const screenFactor = ScreenFactor.get(screening.hall.screenType);

    if (!hallFactor) {
        throw new BadRequestError("Invalid hall type");
    }
    if (!screenFactor) {
        throw new BadRequestError("Invalid screen type");
    }

    const totalPrice = hallFactor * screenFactor * fixedPrice * timeFactor;
    return totalPrice
}