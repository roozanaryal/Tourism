import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    guideName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
