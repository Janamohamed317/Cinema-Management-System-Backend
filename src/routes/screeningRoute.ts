import express from "express"
import { addScreening } from "../controllers/screeningController";


const router = express.Router()

router.post("/add", addScreening)


export default router;