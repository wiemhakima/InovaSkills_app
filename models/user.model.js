const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  
  },
  password: {
    type: String,
    required: true,
   
  }, approved: {
    type: Boolean,
    default: false,
  },testResults: [
    {
      testId: mongoose.Schema.Types.ObjectId,
      score: Number,
      percentage: Number,
      completedAt: { type: Date, default: Date.now },
    }
  ],
  role: { type: String, enum: ['admin', 'user'], default: 'user' },});

module.exports = mongoose.model("User", userSchema);
