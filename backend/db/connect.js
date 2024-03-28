const mongoose = require("mongoose");
const { populateDatabase, populateCarsDatabase } = require("../utils/utils");

const URI = "mongodb+srv://gopalkrishnayadav2003:gopalyadav2003@cluster0.wmmo9dn.mongodb.net/Cab";

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    populateDatabase();
    populateCarsDatabase();
    console.log("Connected to DB!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
