import React from 'react';

function AboutUs() {
  return (
    <div className="about-us-container">
      <section className="company-info">
        <h2>Welcome to QuickStay</h2>
        <p>
          QuickStay is your ultimate solution for booking comfortable, affordable,
          and luxurious stays. We aim to provide seamless hotel and room bookings
          with a wide range of options that suit every budget and preference. Whether
          you're traveling for business or leisure, QuickStay offers a quick and
          hassle-free experience from booking to check-out.
        </p>
        <p>
          We partner with top hotels and resorts to bring you the best selection of
          rooms, ensuring your stay is nothing short of extraordinary. With our easy-to-use
          online booking system and 24/7 customer support, you can rest assured that 
          your travel plans are in safe hands.
        </p>
      </section>

      <section className="our-services">
        <h2>Our Services</h2>
        <ul>
          <li><i className="bi bi-headset"></i> 24/7 Customer Support</li>
          <li><i className="bi bi-house-door"></i> Wide Range of Room Options (Single, Double, Suite)</li>
          <li><i className="bi bi-check-circle"></i> Easy Online Booking and Instant Confirmation</li>
          <li><i className="bi bi-tag"></i> Competitive Prices with Exclusive Deals</li>
          <li><i className="bi bi-lock"></i> Secure Payment Gateway</li>
        </ul>
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you! Whether you have questions about our services,
          need assistance with bookings, or want to share feedback, feel free to reach out
          to us using the following contact information.
        </p>
        <ul>
          <li><i className="bi bi-envelope"></i> Email: <a href="mailto:support@quickstay.com">support@quickstay.com</a></li>
          <li><i className="bi bi-phone"></i> Phone: +1 (800) 123-4567</li>
          <li><i className="bi bi-geo-alt"></i> Address: 123 QuickStay Avenue, Suite 200, Cityville, ST 12345</li>
        </ul>
      </section>

      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>
          At QuickStay, we are dedicated to making travel more accessible and affordable
          for everyone. Our mission is to provide travelers with the most convenient way to
          find and book rooms that match their needs and budget. With an emphasis on reliability,
          customer satisfaction, and innovation, QuickStay is your trusted partner for all your
          accommodation needs.
        </p>
      </section>

      <section className="social-media">
        <h2>Follow Us</h2>
        <p>Stay connected with us through our social media channels for the latest offers, updates, and more!</p>
        <ul>
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i> Facebook</a></li>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i> Instagram</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i> Twitter</a></li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
