const mongoose = require('mongoose');

const enrollmentsSchema = new mongoose.Schema({
  course: { type: String, required: true, trim: true },
  professor: { type: String, required: true, trim: true },
  student: { type: String, required: true, trim: true },
  shift: { type: String, required: true, trim: true },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('enrollments', enrollmentsSchema);