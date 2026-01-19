import express from "express";
import { EmployeeRegister, AssignRole } from "../controllers/employeeManagementController";
import { requireAdmin } from "../middlewares/rolesMiddleware";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/register/employee", verifyToken, requireAdmin, EmployeeRegister);

router.put("/assign/employee", AssignRole);

export default router;
