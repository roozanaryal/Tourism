const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guideName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
