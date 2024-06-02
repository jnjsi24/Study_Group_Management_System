const mongoose = require('mongoose');

// Check if the model is already defined to avoid OverwriteModelError
const Subject = mongoose.models.Subject || mongoose.model('Subject', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  customers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  }],
  cafe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe',
    required: true,
  }
}));

module.exports = Subject;
