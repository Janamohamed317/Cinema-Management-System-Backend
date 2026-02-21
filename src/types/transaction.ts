import { PaymentMethod } from "@prisma/client"

export type PaymentData = {
    cardNumber: string
    CVV: string
    expiryMonth: string
    expiryYear: string
    cardholderName: string
    paymentMethod: PaymentMethod
}