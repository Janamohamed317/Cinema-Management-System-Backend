import express from "express"
import { addScreening, deleteScreening, editScreening, getAllScreenings, restoreScreening, getScreeningDetails } from "../controllers/screeningController";
import { verifyToken } from "../middlewares/verifyToken";
import { requireMovieManagementAccess } from "../middlewares/rolesMiddleware";

const router = express.Router()

router.post("/add", verifyToken, requireMovieManagementAccess, addScreening)

router.delete("/delete/:id", verifyToken, requireMovieManagementAccess, deleteScreening)

router.put("/restore/:id", verifyToken, requireMovieManagementAccess, restoreScreening)

router.put("/edit/:id", verifyToken, requireMovieManagementAccess, editScreening)

router.get("/all", verifyToken, getAllScreenings)

router.get("/:id", verifyToken, getScreeningDetails)

export default router;