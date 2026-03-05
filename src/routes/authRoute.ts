import express from "express"
import { signup, signin, verifyEmail } from "../controllers/authController"


const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/verifyOTP", verifyEmail)


export default router;