const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure unique label names
  },
});

module.exports = mongoose.model('labels', labelSchema);
