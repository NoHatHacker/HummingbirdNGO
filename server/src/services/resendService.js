require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY || "re_dev_dummy_key_for_testing");

const FROM_ADDRESS = process.env.RESEND_FROM || "onboarding@resend.dev";
const FROM_NAME = process.env.RESEND_FROM_NAME || "Hummingbird NGO";
const DOMAIN_VERIFIED = process.env.RESEND_DOMAIN_VERIFIED === "true";
const TEST_TO = process.env.RESEND_TEST_TO || "youremail@gmail.com";

// Development/test mode: intercept sends and redirect to admin test address
function getSendConfig({ to, subject, html, text, scheduledAt }) {
    const originalTo = Array.isArray(to) ? to : [to];

    if (!DOMAIN_VERIFIED) {
        return {
            from: FROM_ADDRESS,
            to: TEST_TO,
            subject: `[TEST MODE] ${subject}`,
            html: `<div style="background:#fff3cd;padding:10px;border-left:4px solid #ffc107;margin-bottom:12px;font-family:sans-serif;">
                <strong>TEST MODE</strong> — Would send to ${originalTo.length} recipient(s): ${originalTo.join(", ")}
                <br>Domain not verified. Switch RESEND_DOMAIN_VERIFIED=true when ready.
            </div>` + (html || ""),
            text: `[TEST MODE] Would send to ${originalTo.join(", ")}.\n\n` + (text || ""),
            ...(scheduledAt ? { scheduledAt } : {}),
        };
    }

    return {
        from: `${FROM_NAME} <${FROM_ADDRESS}>`,
        to: originalTo,
        subject,
        html,
        text,
        ...(scheduledAt ? { scheduledAt } : {}),
    };
}

async function sendEmail({ to, subject, html, text, scheduledAt }) {
    const config = getSendConfig({ to, subject, html, text, scheduledAt });

    try {
        const result = await resend.emails.send(config);
        return {
            success: true,
            id: result?.id,
            message: "Email queued/sent successfully",
            testMode: !DOMAIN_VERIFIED,
        };
    } catch (error) {
        console.error("Resend send error:", error?.message || error);
        return {
            success: false,
            error: error?.message || "Resend send failed",
            testMode: !DOMAIN_VERIFIED,
        };
    }
}

module.exports = {
    sendEmail,
    DOMAIN_VERIFIED,
    FROM_ADDRESS,
};