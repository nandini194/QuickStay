import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Wrap with BrowserRouter

// Import components from the 'components' folder
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BookingPage from "./components/BookingPage";
import RoomPreviews from "./components/RoomPreviews";
import AboutUs from "./components/AboutUs";

const App = () => {
  const [roomAvailability, setRoomAvailability] = useState({
    single: 5,
    double: 3,
    suite: 1,
  });

  return (
    <Router> {/* Wrap everything in Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={
            <BookingPage
              roomAvailability={roomAvailability}
              setRoomAvailability={setRoomAvailability}
            />
          }
        />
        <Route path="/room-previews" element={<RoomPreviews />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
