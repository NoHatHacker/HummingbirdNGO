const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  subscribe,
  getSubscribers,
} = require("../controllers/subscriberController");

const router = express.Router();

router.post("/", subscribe);
router.get("/", protect, getSubscribers);

module.exports = router;
