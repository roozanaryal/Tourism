import Booking from "../models/booking.model.js";
// Book a guide and store guideName and userEmail
export const bookGuide = async (req, res) => {
  try {
    const { guideName, userEmail } = req.body;
    if (!guideName || !userEmail) {
      return res.status(400).json({ message: 'Guide name and user email are required.' });
    }
    // Prevent duplicate booking
    const existingBooking = await Booking.findOne({ guideName, userEmail });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this guide.' });
    }
    const booking = new Booking({ guideName, userEmail });
    await booking.save();
    res.status(201).json({ message: 'Guide booked successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error booking guide', error: error.message });
  }
};