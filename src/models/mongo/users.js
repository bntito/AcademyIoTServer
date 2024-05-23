const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true, trim: true },
  city: { type: String, required: false },
  phone: { type: String, required: false },
  role: { type: String, required: true, trim: true },
  status: { type: String, required: true }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('users', usersSchema);