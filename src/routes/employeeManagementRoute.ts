import express from "express";
import { EmployeeRegister, AssignRole } from "../controllers/employeeManagementController";
import { requireAdmin } from "../middlewares/rolesMiddleware";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/register", verifyToken, requireAdmin, EmployeeRegister);

router.put("/assign", verifyToken, requireAdmin, AssignRole);

export default router;
