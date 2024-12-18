import React, { createContext, useState } from 'react';

// Define initial room availability
const initialRoomCounts = {
  Single: 5,
  Double: 3,
  Suite: 1,
};

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [roomsAvailable, setRoomsAvailable] = useState(initialRoomCounts);
  const [bookingDetails, setBookingDetails] = useState({
    checkInDate: '',
    checkOutDate: '',
    roomType: '',
    numberOfGuests: 1,
    estimatedRate: 0,
    confirmationMessage: '', // Stores confirmation message
  });

  // Calculate rate based on room type and number of guests
  const calculateEstimatedRate = (roomType, numberOfGuests, days) => {
    const rates = { Single: 100, Double: 150, Suite: 250 };
    return rates[roomType] * numberOfGuests * days;
  };

  // Handle room booking
  const handleRoomBooking = (roomType) => {
    if (roomsAvailable[roomType] > 0) {
      setRoomsAvailable((prev) => ({
        ...prev,
        [roomType]: prev[roomType] - 1,
      }));
      setBookingDetails((prev) => ({
        ...prev,
        confirmationMessage: 'Room Booked!',
      }));
    } else {
      setBookingDetails((prev) => ({
        ...prev,
        confirmationMessage: 'Room Unavailable!',
      }));
    }
  };

  // Reset confirmation message
  const resetConfirmation = () => {
    setBookingDetails((prev) => ({
      ...prev,
      confirmationMessage: '',
    }));
  };

  return (
    <BookingContext.Provider
      value={{
        roomsAvailable,
        bookingDetails,
        handleRoomBooking,
        resetConfirmation,
        calculateEstimatedRate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
