const Subscriber = require("../models/Subscriber");

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers
// @access  Public
const subscribe = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });

    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "active";
        await existing.save();
        return res.status(200).json({ message: "Welcome back! Your subscription has been reactivated." });
      }
      return res.status(200).json({ message: "You are already subscribed to our newsletter!" });
    }

    await Subscriber.create({
      email,
      source: source || "website",
    });

    res.status(201).json({ message: "Thank you for subscribing to Hummingbird NGO updates!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all subscribers
// @route   GET /api/subscribers
// @access  Private (Admin)
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  subscribe,
  getSubscribers,
};
