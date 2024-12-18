const Booking = require("../models/Booking");

// Save new booking
const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully!", booking: savedBooking });
  } catch (error) {
    res.status(400).json({ message: "Failed to save booking", error: error.message });
  }
};

// Fetch all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

module.exports = { createBooking, getAllBookings };
