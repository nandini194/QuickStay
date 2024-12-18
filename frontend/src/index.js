import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BookingProvider } from './contexts/BookingContext';
import './index.css'; // Optional: Include your global CSS styles
import './styles.css';  // Assuming styles.css is in the src folder or in the same folder
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BookingProvider>
    <App />
  </BookingProvider>
);