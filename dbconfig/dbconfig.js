const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database to QuickMark Connected Successfully 🙌");
  } catch (error) {
    console.error("Error in MongoDB connection:", error.message);
    
  }
};

module.exports = db;
