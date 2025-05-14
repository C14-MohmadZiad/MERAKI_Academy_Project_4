import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-4">
            <h5 className="footer-logo">MZ-Store</h5>
            <p>Experience smart shopping with exclusive deals and top-notch gadgets.</p>
            <div className="payment-icons mt-3">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fas fa-truck"></i>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-title">Products</h6>
            <ul className="footer-links">
              <li><a href="/shop">Shop</a></li>
              <li><a href="/#products-section">Categories</a></li>
              <li><a href="/produts">Latest Offers</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-title">Company</h6>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <h6 className="footer-title">Follow Us</h6>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center small mt-3">
          &copy; {new Date().getFullYear()} MZ-Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
