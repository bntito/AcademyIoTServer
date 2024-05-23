const mongoose = require('mongoose');

const professorsSchema = new mongoose.Schema({
  dni: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  address: { type: String, required: false },
  city: { type: String, required: true },
  phone: { type: String, required: false, trim: true },
  condition: { type: String, required: false, trim: true }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('professors', professorsSchema);