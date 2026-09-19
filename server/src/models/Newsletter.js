const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    bodyHTML: {
      type: String,
      required: true,
    },

    bodyText: {
      type: String,
    },

    status: {
      type: String,
      enum: ["draft", "scheduled", "sent", "failed"],
      default: "draft",
    },

    segment: {
      type: String,
      enum: ["all", "guwahati", "barpeta", "barpeta_road"],
      default: "all",
    },

    scheduledAt: {
      type: Date,
    },

    sentAt: {
      type: Date,
    },

    sentCount: {
      type: Number,
      default: 0,
    },

    openRate: {
      type: Number,
    },

    clickRate: {
      type: Number,
    },

    featuredImage: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);