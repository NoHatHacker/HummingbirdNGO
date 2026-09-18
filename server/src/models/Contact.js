const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide your email address"],
      trim: true,
      lowercase: true,
    },

    organisation: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      required: [true, "Please select a subject"],
      enum: [
        "General enquiry",
        "Volunteering",
        "Partnership",
        "Donation",
        "Other",
      ],
    },

    message: {
      type: String,
      required: [true, "Please provide a message"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["new", "read", "responded", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
