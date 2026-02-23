import { prisma } from "../../prismaClient/client";
import { PaymentMethod, TransactionStatus } from "@prisma/client";

export const buildTransactionData = (userId: string) => {
    return {
        userId,
        status: TransactionStatus.PENDING,
        totalAmount: 500,
        paymentMethod: PaymentMethod.CREDIT_CARD,
    }
};

export const saveTransactionToDb = async (userId: string) => {
    return await prisma.transaction.create({
        data: buildTransactionData(userId)
    });
};

export const buildPaymentData = () => {
    return {
        cardNumber: "5236412345678901",
        CVV: "154",
        expiryMonth: "11",
        expiryYear: "2029",
        cardholderName: "example",
        paymentMethod: PaymentMethod.CREDIT_CARD
    }
}
export const buildInvalidPaymentData = () => {
    return {
        cardNumber: "52364",
        CVV: "154",
        expiryMonth: "11",
        expiryYear: "2029",
        cardholderName: "example",
        paymentMethod: PaymentMethod.CREDIT_CARD
    }
}
