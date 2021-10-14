
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizeSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  stock: Number
});

module.exports = mongoose.model("Prize", prizeSchema);