const express = require("express");

const memberRoutes = require("./memberRoutes");
const eventRoutes = require("./eventRoutes");
const authRoutes = require("./authRoutes");
const uploadRoutes = require("./uploadRoutes");
const volunteerRoutes = require("./volunteerRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const contactRoutes = require("./contactRoutes");

const router = express.Router();

router.use("/members", memberRoutes);
router.use("/events", eventRoutes);
router.use("/auth", authRoutes);
router.use("/upload", uploadRoutes);
router.use("/volunteers", volunteerRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
