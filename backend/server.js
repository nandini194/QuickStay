const express = require("express"); // Ensure express is imported
const cors = require("cors"); // Ensure cors is imported
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize the express app
const app = express(); // Initialize the app here

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// MongoDB connection setup
mongoose.connect("mongodb+srv://nandinidirisala:DY4XRZHEn07UGp3s@cluster0.umtg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Basic route to handle root path (Fix for 'Cannot GET /' issue)
app.get("/", (req, res) => {
  res.send("Welcome to QuickStay API!");
});

// Define a simple model for the booking (for example purposes)
const Booking = mongoose.model("Booking", new mongoose.Schema({
  name: String,
  mobileNumber: String,
  checkInDate: String,
  checkOutDate: String,
  roomType: String,
  numberOfGuests: Number,
  estimatedCost: Number,
}));

// API endpoint to handle booking submissions
app.post("/api/bookings", async (req, res) => {
  const { name, mobileNumber, checkInDate, checkOutDate, roomType, numberOfGuests, estimatedCost } = req.body;

  // Validate request data
  if (!name || !mobileNumber || !checkInDate || !checkOutDate || !roomType || !numberOfGuests) {
    return res.status(400).json({ error: "Please fill all the details correctly." });
  }

  // Check if mobile number is 10 digits
  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: "Mobile number must be a 10-digit number." });
  }

  // Check if check-out date is after check-in date
  const checkInDateObj = new Date(checkInDate);
  const checkOutDateObj = new Date(checkOutDate);
  if (checkOutDateObj <= checkInDateObj) {
    return res.status(400).json({ error: "Check-out date cannot be earlier than check-in date." });
  }

  // Create a new booking record
  const newBooking = new Booking({
    name,
    mobileNumber,
    checkInDate,
    checkOutDate,
    roomType,
    numberOfGuests,
    estimatedCost,
  });

  try {
    await newBooking.save();
    res.status(200).json({ message: "Booking successful!", booking: newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Failed to save booking. Please try again later." });
  }
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
