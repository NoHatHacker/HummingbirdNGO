const Volunteer = require("../models/Volunteer");

// @desc    Get all volunteer applications
// @route   GET /api/volunteers
// @access  Private (Admin)
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit new volunteer application
// @route   POST /api/volunteers
// @access  Public
const createVolunteer = async (req, res) => {
  try {
    const { name, email, phone, role, regionalCircle, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !role || !regionalCircle) {
      return res.status(400).json({
        message: "Please provide all required fields: name, email, phone, role, and regional circle"
      });
    }

    // Check for duplicate email
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({
        message: "An application with this email already exists. Please contact us directly if you need to update your application."
      });
    }

    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      role,
      regionalCircle,
      message,
      status: "pending",
    });

    res.status(201).json({
      message: "Application submitted successfully! Our regional coordinators will review your application and contact you soon.",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update volunteer application status
// @route   PUT /api/volunteers/:id
// @access  Private (Admin)
const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer application not found" });
    }

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete volunteer application
// @route   DELETE /api/volunteers/:id
// @access  Private (Admin)
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer application not found" });
    }

    await Volunteer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Volunteer application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVolunteers,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
