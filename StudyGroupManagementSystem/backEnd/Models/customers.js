const mongoose = require('mongoose');

const { Schema } = mongoose; // Destructure Schema from mongoose

const customerSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }], // Reference to subjects
  contactNumber: String,
  password: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
