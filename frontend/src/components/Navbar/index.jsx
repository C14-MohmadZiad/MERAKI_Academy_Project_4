import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./style.css";
const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">MZ-Store</Link>
      </div>

      <button
        className="navbar__toggle"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      <div className={`navbar__links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {user?.role === "provider" && (
          <Link to="/add-product">Add Product</Link>
        )}

        {isLoggedIn ? (
          <button className="navbar__btn" onClick={handleLogout}>
            LogOut
          </button>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Create Account</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
