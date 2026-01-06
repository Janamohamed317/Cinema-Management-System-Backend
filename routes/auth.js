const express = require("express")
const { signup, signin, EmployeeRegister } = require("../controllers/authController.js")
const { verifyToken } = require("../middlewares/verifyToken.js")
const { requireAdmin } = require("../middlewares/rolesMiddleware.js")

const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/signup/employee", verifyToken, requireAdmin, EmployeeRegister)




module.exports = router;