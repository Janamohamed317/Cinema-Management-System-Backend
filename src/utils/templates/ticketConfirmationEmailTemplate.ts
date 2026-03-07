import { TicketWithDetails } from "../../types/ticket";

export const ticketConfirmationEmailTemplate = (tickets: TicketWithDetails[]) => {
    const { username } = tickets[0].user;
    const { startTime } = tickets[0].screening;
    const seats = tickets.map(t => t.seat.seatNumber);
    const totalPrice = tickets.reduce((sum, t) => sum + Number(t.price), 0);
    const date = new Date(startTime).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const time = new Date(startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; }
                .header { background: #1a1a2e; color: white; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; }
                .header p { margin: 8px 0 0; color: #e94560; font-size: 13px; letter-spacing: 1px; }
                .content { padding: 40px 30px; color: #333; }
                .success-badge { background: #e8f5e9; border-left: 4px solid #43a047; padding: 12px 16px; border-radius: 4px; font-size: 15px; color: #2e7d32; margin-bottom: 30px; }
                .ticket-box { border: 2px dashed #e94560; border-radius: 12px; padding: 24px; margin: 24px 0; }
                .ticket-box h3 { margin: 0 0 16px; color: #1a1a2e; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
                .ticket-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; }
                .ticket-label { color: #888; }
                .ticket-value { font-weight: bold; color: #1a1a2e; }
                .seats-container { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
                .seats-badge { background: #e94560; color: white; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: bold; }
                .total-row { margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee; display: flex; justify-content: space-between; }
                .total-label { font-weight: bold; color: #333; font-size: 15px; }
                .total-value { color: #e94560; font-weight: bold; font-size: 18px; }
                .ticket-count { background: #1a1a2e; color: white; border-radius: 6px; padding: 10px 16px; font-size: 14px; margin: 16px 0 0; text-align: center; }
                .note { background: #fff8e1; border-left: 4px solid #f9a825; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #555; margin: 20px 0; }
                .footer { background: #1a1a2e; padding: 20px; text-align: center; color: #888; font-size: 12px; }
                .footer span { color: #e94560; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎬 MovieNest</h1>
                    <p>YOUR CINEMA, YOUR WORLD</p>
                </div>

                <div class="content">
                    <h2>Hi ${username},</h2>

                    <div class="success-badge">
                        ✅ Your tickets have been confirmed! Get ready for a great experience.
                    </div>

                    <div class="ticket-box">
                        <h3>🎟 Booking Details</h3>

                        <div class="ticket-row">
                            <span class="ticket-label">Date</span>
                            <span class="ticket-value">${date}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Time</span>
                            <span class="ticket-value">${time}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Seats</span>
                            <div class="seats-container">
                                ${seats.map(seat => `<span class="seats-badge">${seat}</span>`).join("")}
                            </div>
                        </div>

                        <div class="total-row">
                            <span class="total-label">Total Paid</span>
                            <span class="total-value">$${totalPrice.toFixed(2)}</span>
                        </div>

                        <div class="ticket-count">
                            🎫 ${tickets.length} ticket${tickets.length > 1 ? "s" : ""} reserved — Booking ID: ${tickets[0].transactionId}
                        </div>
                    </div>

                    <div class="note">
                        📌 Please arrive at least <strong>15 minutes early</strong>. Show this email or your booking ID at the counter.
                    </div>
                </div>

                <div class="footer">
                    <p>© ${new Date().getFullYear()} <span>MovieNest</span>. All rights reserved.</p>
                    <p>This is an automated message, please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
    `
}