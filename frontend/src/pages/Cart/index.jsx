import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from "../../redux/cartSlice";
import "./style.css";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return <h2 className="empty-cart">Your cart is empty.</h2>;
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>
          Your Cart <span>({items.length} Items)</span>
        </h2>
        {items.map((item) => (
          <div className="cart-card" key={item._id}>
            <img src={item.image} alt={item.name} className="cart-img" />
            <div className="cart-details">
              <h4>{item.name}</h4>
              <p>{item.price} JOD</p>
              <div className="qty-controls">
                <button onClick={() => dispatch(decrementQty(item._id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementQty(item._id))}>
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <h3>Order Summary</h3>
        <div className="summary-line">
          <span>Items subtotal</span>
          <span>{total.toFixed(2)} JOD</span>
        </div>
        <div className="summary-line">
          <span>Standard shipping</span>
          <span>Free</span>
        </div>
        <input
          type="text"
          placeholder="Apply promo code"
          className="promo-input"
        />
        <div className="summary-total">
          <h4>Total</h4>
          <h4 style={{ color: "#ff7900" }}>{total.toFixed(2)} JOD</h4>
        </div>
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </button>
        <button className="clear-btn" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
