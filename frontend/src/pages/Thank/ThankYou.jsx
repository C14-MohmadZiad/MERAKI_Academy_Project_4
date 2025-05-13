import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ThankYou = () => {
  return (
    <div className="thankyou-page">
      <div className="thankyou-box">
        <h2>🎉 Thank You!</h2>
        <p>Your order has been placed successfully.</p>
        <p>We’ll contact you soon to confirm the details.</p>
        <Link to="/" className="home-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default ThankYou;
