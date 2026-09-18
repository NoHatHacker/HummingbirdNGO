const Member = require("../models/Member");

const getMembers = async (req, res) => {
  try {
    const { regionalCircle, wing } = req.query;
    const filter = {};

    if (regionalCircle) {
      filter.regionalCircle = regionalCircle;
    }

    if (wing) {
      filter.wing = wing;
    }

    const members = await Member.find(filter).sort({ servingSince: -1 });

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(
      req.params.id
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
};
