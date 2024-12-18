const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
   
  title: { type: String, required: true },
  passingScore: { type: Number, default: 70 }, // Par défaut, 70% pour réussir
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);