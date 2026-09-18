const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "ngo-events",
      }
    );

    // Clean up local file after successful upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    // Clean up local file even if upload fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Failed to delete temporary file:", unlinkError);
      }
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};