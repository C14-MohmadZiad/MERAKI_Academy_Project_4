import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
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
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {items.map((item) => (
        <React.Fragment key={item._id}>
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-img" />
          <div className="cart-info">
            <h4>{item.name}</h4>
            <p>{item.price} JOD</p>
            <div className="cart-qty">
              <button onClick={() => dispatch(decrementQty(item._id))}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(incrementQty(item._id))}>
                +
              </button>
            </div>
            <button onClick={() => dispatch(removeFromCart(item._id))}>
              Remove
            </button>
          </div>
        </div>
        </React.Fragment>
      ))}
      <div className="cart-summary">
        <h3>Total: {total.toFixed(2)} JOD</h3>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
