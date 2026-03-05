import { VerificationEmailData } from "../../types/emailData"

export const verificationEmailTemplate = (data: VerificationEmailData): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .header {
                    background: #1a1a2e;
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                    letter-spacing: 2px;
                }
                .header p {
                    margin: 8px 0 0;
                    color: #e94560;
                    font-size: 13px;
                    letter-spacing: 1px;
                }
                .content {
                    padding: 40px 30px;
                    color: #333;
                }
                .otp-box {
                    background: #e94560;
                    color: white;
                    font-size: 32px;
                    font-weight: bold;
                    padding: 20px;
                    text-align: center;
                    border-radius: 8px;
                    margin: 30px 0;
                    letter-spacing: 8px;
                }
                .expiry-note {
                    background: #fff8e1;
                    border-left: 4px solid #f9a825;
                    padding: 12px 16px;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #555;
                    margin: 20px 0;
                }
                .security-note {
                    font-size: 13px;
                    color: #888;
                    margin-top: 20px;
                }
                .footer {
                    background: #1a1a2e;
                    padding: 20px;
                    text-align: center;
                    color: #888;
                    font-size: 12px;
                }
                .footer span {
                    color: #e94560;
                }
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
                    <p>Welcome to MovieNest! We're excited to have you on board. To get started, please verify your email address using the OTP below.</p>

                    <p>Enter this code on the verification page:</p>

                    <div class="otp-box">
                        ${data.otp}
                    </div>

                    <div class="expiry-note">
                        ⏱ This code expires in <strong>5 minutes</strong>. If it expires, simply request a new one.
                    </div>

                    <p class="security-note">
                        🔒 If you didn't create a MovieNest account, you can safely ignore this email. Someone may have entered your email address by mistake.
                    </p>
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