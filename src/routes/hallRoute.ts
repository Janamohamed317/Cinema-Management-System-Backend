import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { addHall, deleteHall, getAllHalls, editHall, restoreHall} from "../controllers/hallController"
import { requireHallManagementAccess } from "../middlewares/rolesMiddleware"

const router = express.Router()

router.post("/add", verifyToken, requireHallManagementAccess, addHall)

router.put("/edit/:id", verifyToken, requireHallManagementAccess, editHall)

router.delete("/delete/:id", verifyToken, requireHallManagementAccess, deleteHall)

router.put("/restore/:id", verifyToken, requireHallManagementAccess, restoreHall)

router.get("/all", verifyToken, requireHallManagementAccess, getAllHalls)

export default router
