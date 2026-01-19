import { HallType, ScreenType } from "../generated/prisma"

export type HallAddingBody = {
    name: string,
    type: HallType,
    screenType: ScreenType,
    seats: number
}

export type HallEditingBody = {
    name?: string,
    type?: HallType,
    screenType?: ScreenType,
    seats?: number
}