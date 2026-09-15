const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", submitContactMessage);
router.get("/", protect, getContactMessages);
router.patch("/:id", protect, updateContactStatus);

module.exports = router;
