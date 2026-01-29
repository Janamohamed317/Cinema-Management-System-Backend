export type ScreeningAddingBody = {
    hallId: string
    movieId: string
    startTime: Date
}

export type ScreeningInterval = {
    startTime: Date;
    duration: number; 
};