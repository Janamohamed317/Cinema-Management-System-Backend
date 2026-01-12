const express = require("express")
const { EmployeeRegister, AssignRole } = require("../controllers/employeeManagementController.js")
const { verifyToken } = require("../middlewares/verifyToken.js")
const { requireAdmin } = require("../middlewares/rolesMiddleware.js")
const { addMovie } = require("../controllers/movieController.js")

const router = express.Router()


router.post("/register/employee", verifyToken, requireAdmin, EmployeeRegister)

router.put("/assign/employee", verifyToken, requireAdmin, AssignRole)


module.exports = router;