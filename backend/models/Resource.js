const mongoose = require('mongoose');
const resourceSchema = new mongoose.Schema({
  resourceName: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String, enum: ['Good', 'Average', 'Poor'], required: true },
  availability: { type: String, enum: ['Available', 'Not Available'], default: 'Available' }
}, { timestamps: true });
module.exports = mongoose.model('Resource', resourceSchema);
