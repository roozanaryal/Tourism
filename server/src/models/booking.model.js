import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  guideName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 // 24 hours in seconds
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
