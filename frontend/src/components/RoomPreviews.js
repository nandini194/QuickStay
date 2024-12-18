import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomPreviews() {
  // Room availability data
  const [roomAvailability] = useState({
    single: 5, // Number of available Single Rooms
    double: 3, // Number of available Double Rooms
    suite: 1,  // Number of available Suites
  });

  return (
    <div className="room-previews">
      <div className="room-preview">
        <Link to="/booking" state={{ roomType: 'single' }}>
          <img 
            src="https://ywcavan.org/sites/default/files/styles/scale_width_1440/public/assets/room/room_image/Single-bed-room-YWCA_Hotel_Vancouver.jpg?itok=ha3Io79Z" 
            alt="Single Room" 
          />
        </Link>
        <h3>Single Room</h3>
      </div>
      <div className="room-preview">
        <Link to="/booking" state={{ roomType: 'double' }}>
          <img 
            src="https://i.pinimg.com/474x/9e/81/65/9e8165ea11db2395d1876f47d882102f.jpg" 
            alt="Double Room" 
          />
        </Link>
        <h3>Double Room</h3>
      </div>
      <div className="room-preview">
        <Link to="/booking" state={{ roomType: 'suite' }}>
          <img 
            src="https://www.lottehotel.com/content/dam/lotte-hotel/lotte/yangon/accommodation/hotel/suite/royalsuite/180712-49-2000-acc-yangon-hotel.jpg.thumb.768.768.jpg" 
            alt="Suite" 
          />
        </Link>
        <h3>Suite</h3>
      </div>
    </div>
  );
}

export default RoomPreviews;
