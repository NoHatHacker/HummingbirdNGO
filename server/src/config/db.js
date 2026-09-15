const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Mongo DB Connected");
    } catch (error) {
        console.error(error.message);
        console.log(process.env.MONGO_URL);
        process.exit(1);
    }
};

module.exports = connectDB;
