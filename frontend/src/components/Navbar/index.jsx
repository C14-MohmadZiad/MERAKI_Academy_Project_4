import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // <-- المهم هنا
import { AuthContext } from "../../context/AuthContext";
import {
  FiShoppingCart,
  FiSearch,
  FiUser,
  FiLogOut,
  FiUserPlus,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import "./Style.css";

const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  // ربط عدد السلة من Redux
  const cartItemsCount = useSelector((state) =>
    state.cart.items
      ? state.cart.items.reduce((acc, item) => acc + (item.quantity || 1), 0)
      : 0
  );

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        🚚 <span>Free Delivery on All Orders</span>
      </div>
      <nav className="main-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            MZ-Store
          </Link>
          {/* Search */}
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" aria-label="Search">
              <FiSearch />
            </button>
          </form>
          {/* Links */}
          <div className="nav-links">
            <button
              className="theme-toggle-btn"
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FiSun size={21} /> : <FiMoon size={21} />}
            </button>
            <Link to="/">Home</Link>
            <Link to="/cart" className="cart-link">
              <FiShoppingCart size={21} />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>

            {/* Dynamic Role Links */}
            {user?.role === "provider" && (
              <Link to="/add-product">Add Product</Link>
            )}
            {user?.role === "user" && (
              <Link to="/request-provider">Become a Provider</Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin/requests">Requests</Link>
            )}

            {/* Auth/Profile */}
            {isLoggedIn ? (
              <div className="profile-menu">
                <div
                  className="profile-avatar"
                  onClick={() => setProfileOpen(!profileOpen)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setProfileOpen(false), 120)}
                >
                  <FaRegUserCircle size={26} />
                  <span className="profile-name">
                    {user?.username || "Account"}
                  </span>
                </div>
                {profileOpen && (
                  <div className="dropdown">
                    <Link to="/profile">
                      <FiUser /> Profile
                    </Link>
                    <button type="button" onMouseDown={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <FiUser /> Sign In
                </Link>
                <Link to="/register">
                  <FiUserPlus /> Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
