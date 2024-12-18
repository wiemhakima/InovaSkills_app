const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name :   { type: String },
  description: { type: String, required: true },
  file: { type: String },
})
module.exports = mongoose.model('Skill', skillSchema);

