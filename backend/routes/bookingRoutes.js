const express = require("express");
const Booking = require("../models/bookingModel");
const router = express.Router();

// POST route to create a new booking
router.post("/", async (req, res) => {
  try {
    const {
      name,
      mobileNumber,
      checkInDate,
      checkOutDate,
      roomType,
      numberOfGuests,
      estimatedCost,
    } = req.body;

    // Create a new booking document
    const newBooking = new Booking({
      name,
      mobileNumber,
      checkInDate,
      checkOutDate,
      roomType,
      numberOfGuests,
      estimatedCost,
    });

    // Save the booking to MongoDB
    await newBooking.save();

    res.status(201).json({ message: "Booking successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking." });
  }
});

// GET route to fetch all bookings (optional)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve bookings." });
  }
});

module.exports = router;
