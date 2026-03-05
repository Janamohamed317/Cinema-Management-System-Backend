import { BadRequestError } from "../utils/error";
import { redisClient } from "../utils/redisClient";
import otpGenerator from "otp-generator";

const OTP_EXPIRY_SECONDS = 300;

export const generateOTP = () => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
    });
}
const otpKey = (email: string) => `otp:${email}`

export const saveOTP = async (email: string, otp: string) => {
    await redisClient.setex(otpKey(email), OTP_EXPIRY_SECONDS, otp)
};

export const verifyOTP = async (email: string, otp: string) => {
    const storedOTP = await redisClient.get(otpKey(email))
    if (!storedOTP || storedOTP !== otp) {
        throw new BadRequestError("Invalid OTP")
    }
    await redisClient.del(otpKey(email));
    return true;
}
