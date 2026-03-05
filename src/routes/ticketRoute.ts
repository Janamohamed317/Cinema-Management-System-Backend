import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { reserveTicket, cancelTicket, cancelAllTicketsForScreening, getUserTicketsController, getTicketDetails, getScreeningTickets } from "../controllers/ticketController"
import { verifyUserOwnership } from "../middlewares/rolesMiddleware"

const router = express.Router()

router.post("/reserve", verifyToken, verifyUserOwnership, reserveTicket)

router.delete("/cancel/:id", verifyToken, verifyUserOwnership, cancelTicket)

router.delete("/cancel-screening/:screeningId", verifyToken, cancelAllTicketsForScreening)

router.get("/my-tickets", verifyToken, verifyUserOwnership, getUserTicketsController)

router.get("/screening/:id", verifyToken, getScreeningTickets)

router.get("/:id", verifyToken, getTicketDetails)

export default router
