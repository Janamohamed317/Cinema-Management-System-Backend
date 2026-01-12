const express = require("express")
const { verifyToken } = require("../middlewares/verifyToken.js")
const { addHall, deleteHall, getAllHalls, editHall, restoreHall } = require("../controllers/hallController.js")
const { requireHallManagementAccess } = require("../middlewares/rolesMiddleware.js")

const router = express.Router()


router.post("/add", verifyToken, requireHallManagementAccess, addHall)

router.put("/edit/:id", verifyToken, requireHallManagementAccess, editHall)

router.delete("/delete/:id", verifyToken, requireHallManagementAccess, deleteHall)

router.put("/restore/:id", verifyToken, requireHallManagementAccess, restoreHall)

router.get("/all", verifyToken, requireHallManagementAccess, getAllHalls)



module.exports = router;