import { Role } from "@prisma/client"
import { prisma } from "../prismaClient/client"
import { PaymentData } from "../types/transaction"
import { BadRequestError, ForbiddenError, NotFoundError } from "../utils/error"

export const validatePayment = (paymentData: PaymentData) => {
    const cleanCardNumber = paymentData.cardNumber.replace(/\s/g, '')

    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        throw new BadRequestError("Invalid card number length")
    }
    if (!/^\d+$/.test(cleanCardNumber)) {
        throw new BadRequestError("Card number must contain only digits")
    }
    if (!/^\d{3,4}$/.test(paymentData.CVV)) {
        throw new BadRequestError("CVV must be 3 or 4 digits")
    }
    const date = new Date(Date.now())

    if (Number(paymentData.expiryYear) < date.getFullYear() ||
        (Number(paymentData.expiryYear) === date.getFullYear() && Number(paymentData.expiryMonth) < date.getMonth() + 1)) {
        throw new BadRequestError("Card is Expired")
    }
    return true
}

export const getUserTransactions = async (userId: string) => {
    return await prisma.transaction.findMany({
        where: { userId },
        include: { tickets: { include: { screening: { include: { hall: true, movie: true } }, seat: true } } },
        orderBy: { createdAt: "desc" }
    })
}

export const getTransactionById = async (id: string, userId: string, role: Role) => {
    const transaction = await prisma.transaction.findUnique({
        where: { id }, include: {
            tickets: { include: { screening: { include: { hall: true, movie: true } }, seat: true } }
        }
    })
    if (!transaction) {
        throw new NotFoundError("No transactions found for that user")
    }

    if (transaction.userId !== userId && role !== Role.SUPER_ADMIN) {
        throw new ForbiddenError("Not Authorized to view this transaction")
    }
    return transaction
}