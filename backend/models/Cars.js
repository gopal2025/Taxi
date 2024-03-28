const mongoose = require("mongoose");

const Cars = new mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  bookedBy: String,
  occupied: Boolean,
  bookTime: Number,
  endTime: Number,
});

const CarsModel = mongoose.model("Cars", Cars);
module.exports = CarsModel;
