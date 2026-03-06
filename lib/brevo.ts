import * as brevo from '@getbrevo/brevo';
import { db, hasDatabase } from '@/lib/db';
import { waitlist } from '@/db/schema';
import { getWaitlistEntries } from '@/lib/waitlist-local';

export async function sendWaitlistEmailNotification(email: string, country?: string | null) {
    console.log('[Brevo] Preparing to send email notification...');

    if (!process.env.BREVO_API_KEY) {
        console.error('[Brevo] Missing BREVO_API_KEY in environment variables');
        return;
    }

    try {
        // Fetch all waitlist records (from Neon or local store)
        const allRecords = hasDatabase && db
            ? await db.select().from(waitlist)
            : (await getWaitlistEntries()).map((r) => ({ email: r.email, country: r.country, city: r.city, createdAt: r.createdAt }));
        console.log(`[Brevo] Fetched ${allRecords.length} total waitlist records`);

        // Generate HTML table for all records
        const recordsTableHtml = allRecords.length > 0 ? `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #4CAF50; color: white;">
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">#</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Email</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Country</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">City</th>
                        <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${allRecords.map((record, index) => `
                        <tr style="background-color: ${index % 2 === 0 ? '#f9f9f9' : '#ffffff'};">
                            <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${record.email}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${record.country || 'N/A'}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${record.city || 'N/A'}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${record.createdAt ? new Date(record.createdAt).toLocaleString() : 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p>No records found.</p>';

        // Initialize Brevo API client with API key
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "🎉 New Waitlist Signup - Anumi";
        sendSmtpEmail.htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        h1 {
                            color: #4CAF50;
                            margin-bottom: 20px;
                        }
                        .info-box {
                            background-color: #f9f9f9;
                            padding: 15px;
                            border-left: 4px solid #4CAF50;
                            margin: 20px 0;
                        }
                        .info-label {
                            font-weight: bold;
                            color: #333;
                        }
                        .info-value {
                            color: #666;
                            margin-left: 10px;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                            color: #999;
                            font-size: 12px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🚀 New Waitlist Signup!</h1>
                        <p>Great news! Someone new has joined your waitlist.</p>

                        <div class="info-box">
                            <div>
                                <span class="info-label">📧 Email:</span>
                                <span class="info-value">${email}</span>
                            </div>
                            <div style="margin-top: 10px;">
                                <span class="info-label">🌍 Country:</span>
                                <span class="info-value">${country || 'Unknown'}</span>
                            </div>
                            <div style="margin-top: 10px;">
                                <span class="info-label">⏰ Time:</span>
                                <span class="info-value">${new Date().toLocaleString()}</span>
                            </div>
                        </div>

                        <p>This notification was automatically generated by your Anumi waitlist system.</p>

                        <div class="footer">
                            <p>Powered by Brevo Email API</p>
                        </div>
                    </div>

                    <div class="container" style="margin-top: 30px;">
                        <h2 style="color: #2196F3; margin-bottom: 15px;">📋 All Waitlist Records (Total: ${allRecords.length})</h2>
                        ${recordsTableHtml}
                    </div>
                </body>
            </html>
        `;

        sendSmtpEmail.sender = {
            name: "Anumi Waitlist",
            email: "lucascyrilsamuel@gmail.com"
        };

        sendSmtpEmail.to = [

            {
                email: "support@anumi.in",
                name: "Anumi Support"
            },
            {
                email: "furqaan616@gmail.com",
                name: "Furqaan"
            }
        ];

        sendSmtpEmail.replyTo = {
            email: "lucascyrilsamuel@gmail.com",
            name: "Anumi"
        };

        console.log('[Brevo] Sending email with the following details:');
        console.log(`  - To: lucascyrilsamuel@gmail.com, support@anumi.in, furqaan616@gmail.com`);
        console.log(`  - Subject: New Waitlist Signup - Anumi`);
        console.log(`  - Waitlist Email: ${email}`);
        console.log(`  - Country: ${country || 'Unknown'}`);

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log('[Brevo] ✅ Email sent successfully!');
        console.log('[Brevo] Response:', JSON.stringify(data, null, 2));

        return data;
    } catch (error: any) {
        console.error('[Brevo] ❌ Failed to send email notification:', error);
        console.error('[Brevo] Error details:', {
            message: error.message,
            response: error.response?.text || error.response
        });
        // Don't block the main flow if email fails
    }
}

export async function sendWelcomeEmail(email: string) {
    console.log('[Brevo] Preparing to send welcome email to:', email);

    if (!process.env.BREVO_API_KEY) {
        console.error('[Brevo] Missing BREVO_API_KEY in environment variables');
        return;
    }

    try {
        // Initialize Brevo API client with API key
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = "Welcome to Anumi Waitlist! 🎉";
        sendSmtpEmail.htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        h1 {
                            color: #2196F3;
                            margin-bottom: 20px;
                        }
                        .welcome-message {
                            font-size: 16px;
                            line-height: 1.6;
                            color: #333;
                        }
                        .cta-button {
                            display: inline-block;
                            padding: 12px 30px;
                            background-color: #4CAF50;
                            color: white !important;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                            color: #999;
                            font-size: 12px;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>🎉 You're on the waitlist!</h1>
                        <div class="welcome-message">
                            <p>Hi there!</p>
                            <p>Thank you for joining the Anumi waitlist. We're thrilled to have you on board!</p>
                            <p>You'll be among the first to know when we launch. We're working hard to bring you something amazing.</p>
                            <p>Stay tuned for updates!</p>
                        </div>

                        <div class="footer">
                            <p>This email was sent to ${email}</p>
                            <p>© 2026 Anumi. All rights reserved.</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        sendSmtpEmail.sender = {
            name: "Anumi",
            email: "lucascyrilsamuel@gmail.com"
        };

        sendSmtpEmail.to = [{
            email: email,
            name: "Waitlist Member"
        }];

        console.log('[Brevo] Sending welcome email to:', email);

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log('[Brevo] ✅ Welcome email sent successfully to:', email);
        console.log('[Brevo] Response:', JSON.stringify(data, null, 2));

        return data;
    } catch (error: any) {
        console.error('[Brevo] ❌ Failed to send welcome email:', error);
        console.error('[Brevo] Error details:', {
            message: error.message,
            response: error.response?.text || error.response
        });
    }
}
