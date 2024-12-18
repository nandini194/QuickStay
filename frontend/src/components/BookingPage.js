import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access the roomType from the link state

const BookingPage = ({ roomAvailability, setRoomAvailability }) => {
  const { state } = useLocation(); // Get the state passed from RoomPreviews
  const { roomType: initialRoomType } = state || {}; // Default to empty object if no state is passed

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState(initialRoomType || ""); // Default to the room type passed from the link
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [statusMessage, setStatusMessage] = useState(""); // For status bar message

  const roomPrices = {
    single: 100,
    double: 150,
    suite: 200,
  };

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const days = calculateDays(checkInDate, checkOutDate);
      if (days > 0 && roomType) {
        const roomCost = roomPrices[roomType];
        const totalCost = roomCost * days * numberOfGuests;
        setEstimatedCost(totalCost);
      }
    }
  }, [checkInDate, checkOutDate, roomType, numberOfGuests]);

  const calculateDays = (checkIn, checkOut) => {
    const checkInDateObj = new Date(checkIn);
    const checkOutDateObj = new Date(checkOut);
    const timeDiff = checkOutDateObj - checkInDateObj;
    const days = timeDiff / (1000 * 3600 * 24);
    return days;
  };

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleGuestsChange = (e) => {
    setNumberOfGuests(e.target.value);
  };

  const handleBooking = async () => {
    if (!name || !mobileNumber || !checkInDate || !checkOutDate || !roomType || !numberOfGuests) {
      setErrorMessage("Please fill all the details correctly.");
      setStatusMessage(""); // Clear any previous status message
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setErrorMessage("Mobile number must be a 10-digit number.");
      setStatusMessage(""); // Clear any previous status message
      return;
    }

    const days = calculateDays(checkInDate, checkOutDate);
    if (days < 0) {
      setErrorMessage("Check-out date cannot be earlier than check-in date.");
      setStatusMessage(""); // Clear any previous status message
      return;
    }

    if (roomAvailability[roomType] > 0) {
      try {
        // Prepare the booking data
        const bookingData = {
          name,
          mobileNumber,
          checkInDate,
          checkOutDate,
          roomType,
          numberOfGuests,
          estimatedCost,
        };

        // Send booking data to backend API
        const response = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit booking. Please try again.");
        }

        const updatedAvailability = { ...roomAvailability };
        updatedAvailability[roomType] -= 1;
        setRoomAvailability(updatedAvailability);

        // Reset form fields
        setName("");
        setMobileNumber("");
        setCheckInDate("");
        setCheckOutDate("");
        setRoomType("");
        setNumberOfGuests(1);
        setEstimatedCost(0);
        setErrorMessage("");

        // Set status message
        setStatusMessage(`Booking successful! Cost: $${estimatedCost}`);
      } catch (error) {
        setErrorMessage(error.message);
        setStatusMessage(""); // Clear any previous status message
      }
    } else {
      setErrorMessage("Sorry, this room type is no longer available.");
      setStatusMessage(""); // Clear any previous status message
    }
  };

  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="booking-page">
      <h2>Booking Form</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Check-in Date:</label>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          min={getCurrentDate()} // Block dates prior to today
        />
      </div>

      <div className="form-group">
        <label>Check-out Date:</label>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          min={checkInDate} // Ensure check-out date is not before check-in date
        />
      </div>

      <div className="form-group">
        <label>Room Type:</label>
        <select value={roomType} onChange={handleRoomTypeChange}>
          <option value="">Select a Room Type</option>
          <option value="single">
            Single - ${roomPrices.single} (Available: {roomAvailability.single})
          </option>
          <option value="double">
            Double - ${roomPrices.double} (Available: {roomAvailability.double})
          </option>
          <option value="suite">
            Suite - ${roomPrices.suite} (Available: {roomAvailability.suite})
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Number of Guests:</label>
        <input
          type="number"
          min="1"
          value={numberOfGuests}
          onChange={handleGuestsChange}
        />
      </div>

      {estimatedCost > 0 && (
        <div className="estimated-cost">
          <h3>Estimated Cost: ${estimatedCost}</h3>
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button onClick={handleBooking}>Book Now</button>

      {/* Status Bar for Success/Error Messages */}
      {statusMessage && (
        <div className="status-bar">
          <p>{statusMessage}</p>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
