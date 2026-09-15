const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      enum: [
        "Field Volunteer",
        "Campus Ambassador",
        "Tech Volunteer",
        "Media & Content",
        "Fundraising",
        "Admin Support",
      ],
    },

    regionalCircle: {
      type: String,
      required: true,
      enum: [
        "Guwahati",
        "Barpeta",
        "Barpeta Road",
        "Remote/Online",
      ],
    },

    message: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    resumeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
