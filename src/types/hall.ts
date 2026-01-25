import { HallType, ScreenType } from "@prisma/client"


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