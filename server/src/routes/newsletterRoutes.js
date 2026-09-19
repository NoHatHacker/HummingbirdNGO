const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/newsletterController");

const router = express.Router();

router.post("/", protect, createNewsletter);
router.get("/", protect, getNewsletters);
router.get("/:id", protect, getNewsletter);
router.put("/:id", protect, updateNewsletter);
router.delete("/:id", protect, deleteNewsletter);
router.post("/:id/send", protect, sendNow);
router.post("/:id/test", protect, sendTest);
router.post("/:id/preview", protect, previewNewsletter);
router.get("/:id/stats", protect, getStats);
router.post("/unsubscribe", unsubscribe);

module.exports = router;