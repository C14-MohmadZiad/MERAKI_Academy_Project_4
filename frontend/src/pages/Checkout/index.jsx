import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.price * qty;
  }, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    navigate("/thankyou");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Customer Info</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="07XXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label>Shipping Address</label>
          <input
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="card">Credit Card</option>
          </select>
          <button type="submit">Place Order</button>
        </form>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <p>
          <span>Items subtotal</span>
          <span>{total.toFixed(2)} JOD</span>
        </p>
        <p>
          <span>Shipping</span>
          <span>Free</span>
        </p>
        <hr />
        <p className="checkout-total">
          <span>Total</span>
          <span>{total.toFixed(2)} JOD</span>
        </p>
      </div>
    </div>
  );
};

export default Checkout;
