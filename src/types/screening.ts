import { HallType, ScreenType } from "@prisma/client"

export type ScreeningAddingBody = {
    hallId: string
    movieId: string
    startTime: Date
}

export type ScreeningEditingBody = {
    hallId?: string
    movieId?: string
    startTime?: Date
}

export type ScreeningInterval = {
    startTime: Date;
    duration: number;
};

export type ScreeningDetails = {
    movie: {
        name: string,
        duration: number
    }
    hall:
    {
        name: string,
        type: HallType,
        screenType: ScreenType
    }
    startTime: Date
}