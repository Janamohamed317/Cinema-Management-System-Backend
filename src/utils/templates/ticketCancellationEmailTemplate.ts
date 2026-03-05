import { TicketCancellationEmailData } from "../../types/emailData";

export const ticketCancellationEmailTemplate = (data: TicketCancellationEmailData): string => {
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
                .cancel-badge { background: #ffebee; border-left: 4px solid #e53935; padding: 12px 16px; border-radius: 4px; font-size: 15px; color: #c62828; margin-bottom: 30px; }
                .ticket-box { border: 2px dashed #ccc; border-radius: 12px; padding: 24px; margin: 24px 0; }
                .ticket-box h3 { margin: 0 0 16px; color: #1a1a2e; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
                .ticket-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 14px; }
                .ticket-label { color: #888; }
                .ticket-value { font-weight: bold; color: #1a1a2e; text-decoration: line-through; opacity: 0.6; }
                .refund-box { background: #e8f5e9; border-left: 4px solid #43a047; padding: 16px; border-radius: 4px; margin: 20px 0; }
                .refund-box p { margin: 0 0 6px; font-size: 14px; color: #2e7d32; }
                .refund-amount { font-size: 22px; font-weight: bold; color: #43a047; }
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
                    <h2>Hi ${data.username},</h2>

                    <div class="cancel-badge">
                        ❌ Your booking has been cancelled as requested.
                    </div>

                    <div class="ticket-box">
                        <h3>🎟 Cancelled Booking</h3>

                        <div class="ticket-row">
                            <span class="ticket-label">Movie</span>
                            <span class="ticket-value">${data.movieTitle}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Date</span>
                            <span class="ticket-value">${data.date}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Time</span>
                            <span class="ticket-value">${data.time}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Hall</span>
                            <span class="ticket-value">${data.hallName}</span>
                        </div>
                      <div class="ticket-row">
                            <span class="ticket-label">Seats</span>
                            <div style="display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end;">
                                ${data.seats.map(seat => `<span style="background: #ccc; color: #333; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: bold; text-decoration: line-through; opacity: 0.6;">${seat}</span>`).join("")}
                            </div>
                      </div>
                    </div>

                    <div class="refund-box">
                        <p>💳 Refund Amount</p>
                        <span class="refund-amount">$${data.refundAmount.toFixed(2)}</span>
                        <p style="margin: 8px 0 0; font-size: 13px;">
                            Your refund will be processed within <strong>5–7 business days</strong> to your original payment method.
                        </p>
                    </div>

                    <div class="note">
                        🎬 Changed your mind? Head back to MovieNest and book a new screening anytime.
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