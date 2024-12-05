const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI); // Connect with DB stored in .env
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Failure.
  }
};

module.exports = connectDB;
