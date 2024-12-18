const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  mobileNumber: String,
  checkInDate: Date,
  checkOutDate: Date,
  roomType: String,
  numberOfGuests: Number,
  estimatedCost: Number,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
