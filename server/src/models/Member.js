const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
    },

    image: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    regionalCircle: {
      type: String,
      enum: ["guwahati", "barpeta", "barpeta_road", "none"],
      default: "none",
    },

    wing: {
      type: String,
      enum: ["program_research", "tech", "media_pr", "finance", "college_units", "core_admin", "none"],
      default: "none",
    },

    age: {
      type: Number,
    },

    quote: {
      type: String,
    },

    achievements: [
      {
        title: String,
        year: String,
      },
    ],

    qualifications: [
      {
        qual: String,
        year: String,
      },
    ],
    joinedAt: {  
        type: Date,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
