import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getTransactionByIdController, getUserTransactionsController } from "../controllers/transactionController";

const router = Router();

router.get("/", verifyToken, getUserTransactionsController);
router.get("/:id", verifyToken, getTransactionByIdController);

export default router;
