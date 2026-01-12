const express = require("express")
const { verifyToken } = require("../middlewares/verifyToken.js")
const { requireMovieManagementAccess } = require("../middlewares/rolesMiddleware.js")
const { addMovie, editMovie, deleteMovie, restoreMovie, getAllMovies } = require("../controllers/movieController.js")

const router = express.Router()


router.post("/add", verifyToken, requireMovieManagementAccess, addMovie)

router.put("/edit/:id", verifyToken, requireMovieManagementAccess, editMovie)

router.delete("/delete/:id", verifyToken, requireMovieManagementAccess, deleteMovie)

router.put("/restore/:id", verifyToken, requireMovieManagementAccess, restoreMovie)

router.get("/all", verifyToken, getAllMovies)



module.exports = router;