export type MovieAddingBody = {
    name: string
    duration: number
}

export type MovieEditingBody = {
    name?: string
    duration?: number
}