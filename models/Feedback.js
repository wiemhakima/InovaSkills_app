const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    username: String,
    rating: Number,
    comment: String,
  });
  

  module.exports = mongoose.model("Feedback", feedbackSchema);