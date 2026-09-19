const newsletterController = require("../controllers/newsletterController");

// Simple webhook handler for Resend events
// In production, verify signature with RESEND_WEBHOOK_SECRET
const handleWebhook = async (req, res) => {
    try {
        const event = req.body;
        // Aggregate stats updates could happen here
        // For MVP, just acknowledge receipt
        console.log("Resend webhook event:", event?.type || "unknown");
        res.status(200).json({ received: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleWebhook };