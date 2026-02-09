import { addMovieService, editMovieService, findMovieById, findMovieByName, isMovieDeleted, restoreMovieService, softDeleteMovieService }
    from "../../services/movieServices"
import { prisma } from "../../prismaClient/client"

jest.mock("../../prismaClient/client")

describe("Movie Service Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("findMovieByName", () => {
        it("returns the movie when it exists", async () => {
            const mockMovie = { id: "1", name: "Inception", deletedAt: null };

            (prisma.movie.findFirst as jest.Mock).mockResolvedValue(mockMovie)

            const result = await findMovieByName("Inception")
            expect(result).toEqual(mockMovie)
        })

        it("returns null when the movie does not exist", async () => {

            (prisma.movie.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findMovieByName("Unknown Movie")
            expect(result).toBeNull()
        })
    })

    describe("findMovieById", () => {
        it("returns the movie when it exists", async () => {
            const mockMovie = { id: "1", name: "Inception", deletedAt: null };
            (prisma.movie.findFirst as jest.Mock).mockResolvedValue(mockMovie)

            const result = await findMovieById("1")
            expect(result).toEqual(mockMovie)
        })

        it("returns null when the movie does not exist", async () => {

            (prisma.movie.findFirst as jest.Mock).mockResolvedValue(null)

            const result = await findMovieById("999")
            expect(result).toBeNull()
        })
    })

    it("Creates a movie and returns it", async () => {
        const movieData = { name: "Inception", duration: 148 }
        const createdMovie = { id: "1", ...movieData, deletedAt: null };

        (prisma.movie.findFirst as jest.Mock).mockResolvedValue(null);
        (prisma.movie.create as jest.Mock).mockResolvedValue(createdMovie)

        const result = await addMovieService(movieData)
        expect(prisma.movie.create).toHaveBeenCalledWith({ data: movieData })
        expect(result).toEqual(createdMovie)
    })

    describe("editMovieService", () => {
        it("updates movie name", async () => {
            const data = { name: "Inception 2" };

            (prisma.movie.findFirst as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174001", name: "Inception" });
            (prisma.movie.update as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174001", ...data })

            await editMovieService("123e4567-e89b-12d3-a456-426614174001", data)
            expect(prisma.movie.update).toHaveBeenCalledWith({
                where: { id: "123e4567-e89b-12d3-a456-426614174001" },
                data,
            })
        })
    })

    it("Soft Delete Movie Service", async () => {

        (prisma.movie.updateMany as jest.Mock).mockResolvedValue({ count: 1 })

        await softDeleteMovieService("123e4567-e89b-12d3-a456-426614174001")

        expect(prisma.movie.updateMany).toHaveBeenCalledWith({
            where: { id: "123e4567-e89b-12d3-a456-426614174001", deletedAt: null },
            data: { deletedAt: expect.any(Date) },
        })
    })

    it("Restore Movie Service", async () => {
        (prisma.movie.findFirst as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174001", deletedAt: new Date() });
        (prisma.movie.update as jest.Mock).mockResolvedValue({ id: "123e4567-e89b-12d3-a456-426614174001", deletedAt: null })

        await restoreMovieService("123e4567-e89b-12d3-a456-426614174001")

        expect(prisma.movie.update).toHaveBeenCalledWith({
            where: { id: "123e4567-e89b-12d3-a456-426614174001" },
            data: { deletedAt: null },
        })
    })

    describe("check if Movie is Deleted", () => {
        it("Not Deleted", () => {
            const movie = { id: "1", name: "Inception", deletedAt: null, duration: 50, createdAt: new Date(), }
            const result = isMovieDeleted(movie)
            expect(result).toBe(false)
        })

        it("Deleted", () => {
            const movie = { id: "1", name: "Inception", deletedAt: new Date(), duration: 50, createdAt: new Date(), }
            const result = isMovieDeleted(movie)
            expect(result).toBe(true)
        })
    })
})
