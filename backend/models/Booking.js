const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format YYYY-MM-DD
  startTime: { type: String, required: true }, // Format HH:mm (24 hour)
  endTime: { type: String, required: true }, // Format HH:mm (24 hour)
  purpose: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
