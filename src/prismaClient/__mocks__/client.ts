export const prisma = {
    hall: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
    },
    movie: {
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
    },
    user: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
    },
    screening: {
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
    },
    seat: {
        findFirst: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
    },
    ticket: {
        findFirst: jest.fn(),
        create: jest.fn(),
        updateMany: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(require("../../prismaClient/client").prisma)),
}

