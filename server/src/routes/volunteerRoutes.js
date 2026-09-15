const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getVolunteers,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerController");

const router = express.Router();

// Public route for submitting applications
router.post("/", createVolunteer);

// Protected admin routes
router.get("/", protect, getVolunteers);
router.put("/:id", protect, updateVolunteer);
router.delete("/:id", protect, deleteVolunteer);

module.exports = router;
