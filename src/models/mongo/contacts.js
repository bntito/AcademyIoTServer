const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: false, trim: true },
  city: { type: String, required: true, trim: true },
  message: { type: String, required: true }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('contacts', contactsSchema);