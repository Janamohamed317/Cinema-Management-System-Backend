import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { requireMovieManagementAccess } from "../middlewares/rolesMiddleware"
import {
  addMovie,
  editMovie,
  deleteMovie,
  restoreMovie,
  getAllMovies,
} from "../controllers/movieController"

const router = express.Router()

router.post("/add", verifyToken, requireMovieManagementAccess, addMovie)

router.put("/edit/:id", verifyToken, requireMovieManagementAccess, editMovie)

router.delete("/delete/:id", verifyToken, requireMovieManagementAccess, deleteMovie)

router.put("/restore/:id", verifyToken, requireMovieManagementAccess, restoreMovie)

router.get("/all", verifyToken, getAllMovies)

export default router
