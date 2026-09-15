const Contact = require("../models/Contact");

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res) => {
  try {
    const { name, email, organisation, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please provide all required fields (name, email, subject, message)",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      organisation: organisation || "",
      subject,
      message,
    });

    res.status(201).json({
      message: "Thank you for your message. We'll get back to you within 2–3 working days.",
      contactId: contact._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact message status
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "responded", "archived"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
};
