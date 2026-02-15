import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { addSeat, deleteSeat, editSeat, restoreSeat, getAvailableSeats } from "../controllers/seatController"
import { requireHallManagementAccess } from "../middlewares/rolesMiddleware"

const router = express.Router()

router.post("/add", verifyToken, requireHallManagementAccess, addSeat)

router.put("/edit/:id", verifyToken, requireHallManagementAccess, editSeat)

router.delete("/delete/:id", verifyToken, requireHallManagementAccess, deleteSeat)

router.put("/restore/:id", verifyToken, requireHallManagementAccess, restoreSeat)

router.get("/available-seats/:id", verifyToken, requireHallManagementAccess, getAvailableSeats)

export default router
