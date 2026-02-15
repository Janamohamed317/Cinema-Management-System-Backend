import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { cancelAllTicketsForScreeningService, cancelTicketService, findUserTicketsService, getScreeningTicketsService, getTicketDetailsService, reserveTicketService } from "../services/ticketServices";
import { TicketAddingBody } from "../types/ticket";
import { AuthRequest } from "../types/auth";

export const reserveTicket = asyncHandler(async (req: AuthRequest<{}, {}, TicketAddingBody>, res: Response) => {
    const tickets = await reserveTicketService(req.body, req.user!.id);
    res.status(201).json({ message: "Tickets reserved successfully", tickets });
});

export const cancelTicket = asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    await cancelTicketService(req.params.id, req.user!.id);
    res.status(200).json({ message: "Ticket cancelled successfully" });
});

export const cancelAllTicketsForScreening = asyncHandler(async (req: AuthRequest<{ screeningId: string }>, res: Response) => {
    await cancelAllTicketsForScreeningService(req.params.screeningId, req.user!.id);
    res.status(200).json({ message: "Tickets cancelled successfully" });
});

export const getUserTicketsController = asyncHandler(async (req: AuthRequest, res: Response) => {
    const tickets = await findUserTicketsService(req.user!.id);
    res.status(200).json(tickets);
});

export const getTicketDetails = asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    const ticket = await getTicketDetailsService(req.params.id)
    res.status(200).json(ticket)
})

export const getScreeningTickets = asyncHandler(async (req: AuthRequest<{ id: string }>, res: Response) => {
    const tickets = await getScreeningTicketsService(req.params.id)
    res.status(200).json(tickets)
})