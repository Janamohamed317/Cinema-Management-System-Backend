import { Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthRequest } from "../types/auth";
import { getTransactionById, getUserTransactions } from "../services/transactionServices";

export const getUserTransactionsController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const transactions = await getUserTransactions(req.user!.id);
    res.status(200).json(transactions);
    return
});

export const getTransactionByIdController = asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    const transaction = await getTransactionById(req.params.id, req.user!.id, req.user!.role)
    res.status(200).json(transaction);
    return
});
