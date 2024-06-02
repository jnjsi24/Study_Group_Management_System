const mongoose = require('mongoose');

// Check if the model is already defined to avoid OverwriteModelError
const CafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  }
}, { collection: 'cafes' });

const Cafe = mongoose.models.Cafe || mongoose.model('Cafe', CafeSchema);

module.exports = Cafe;
