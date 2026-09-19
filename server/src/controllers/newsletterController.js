const newsletterService = require("../services/newsletterService");

const createNewsletter = async (req, res) => {
    try {
        const newsletter = await newsletterService.createDraft(req.admin.id || "admin", req.body);
        res.status(201).json(newsletter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNewsletters = async (req, res) => {
    try {
        const list = await newsletterService.listNewsletters(req.query);
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNewsletter = async (req, res) => {
    try {
        const Newsletter = require("../models/Newsletter");
        const nl = await Newsletter.findById(req.params.id);
        if (!nl) return res.status(404).json({ message: "Newsletter not found" });
        res.status(200).json(nl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateNewsletter = async (req, res) => {
    try {
        const updated = await newsletterService.updateDraft(req.params.id, req.body, req.admin?.id);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteNewsletter = async (req, res) => {
    try {
        await newsletterService.deleteNewsletter(req.params.id);
        res.status(200).json({ message: "Newsletter deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendNow = async (req, res) => {
    try {
        const result = await newsletterService.sendNow(req.params.id, req.admin?.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendTest = async (req, res) => {
    try {
        const Newsletter = require("../models/Newsletter");
        const nl = await Newsletter.findById(req.params.id);
        if (!nl) return res.status(404).json({ message: "Not found" });

        const { sendEmail } = require("../services/resendService");
        const result = await sendEmail({
            to: process.env.RESEND_TEST_TO || "youremail@gmail.com",
            subject: `[TEST] ${nl.subject}`,
            html: nl.bodyHTML,
            text: nl.bodyText || nl.bodyHTML.replace(/<[^>]*>/g, ""),
        });
        res.status(200).json({ success: result.success, testMode: result.testMode, message: "Test sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const previewNewsletter = async (req, res) => {
    try {
        const html = await newsletterService.preview(req.params.id);
        res.status(200).json({ html });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const stats = await newsletterService.getStats(req.params.id);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const unsubscribe = async (req, res) => {
    try {
        const { email, token } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });
        const result = await newsletterService.unsubscribe(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const scheduleNewsletter = async (req, res) => {
    try {
        const nl = await newsletterService.scheduleNewsletter(req.params.id, req.body.scheduledAt);
        res.status(200).json(nl);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const cancelSchedule = async (req, res) => {
    try {
        const nl = await newsletterService.cancelSchedule(req.params.id);
        res.status(200).json(nl);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createNewsletter,
    getNewsletters,
    getNewsletter,
    updateNewsletter,
    deleteNewsletter,
    sendNow,
    sendTest,
    previewNewsletter,
    getStats,
    unsubscribe,
    scheduleNewsletter,
    cancelSchedule,
};