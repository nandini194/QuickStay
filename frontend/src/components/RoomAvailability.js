import React from 'react';

const RoomAvailability = ({ roomsAvailable }) => {
  return (
    <div className="room-availability-container">
      <h3>Room Availability</h3>
      <div className="scrolling-room-info">
        {Object.keys(roomsAvailable).map((roomType) => (
          <div key={roomType} className="room-info">
            <strong>{roomType}:</strong> {roomsAvailable[roomType]} rooms available
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAvailability;
