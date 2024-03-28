const mongoose = require("mongoose");

const Connection = new mongoose.Schema({
  source: String,
  destination: String,
  time: Number,
});

const ConnectionModel = mongoose.model("Connection", Connection);

module.exports = ConnectionModel;
