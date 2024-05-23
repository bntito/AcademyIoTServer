const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { Mixed } = Schema.Types;

const coursesSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  cost: { type: String, required: true, trim: true },
  condition: { type: String, required: true, trim: true },
  duration: { type: String, required: false },
  qualification: { type: String, required: false },
  professors: Mixed,
  urlImg: { type: String }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('courses', coursesSchema);