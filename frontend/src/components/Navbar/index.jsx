import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const Navbar = () => {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <>

          {/* ——— Top Banner ——— */}
          <div className="navbar__top-banner">
        <span className="navbar__top-icon">🚚</span>
        <span className="navbar__top-text">Free Delivery on All Orders</span>
      </div>
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          MZ-Store
        </Link>
      </div>
      <div className="navbar__search-container">
        <input
          type="text"
          placeholder="Search for ..."
          className="navbar__search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button
          className="navbar__search-icon"
          onClick={() => navigate(`/?search=${searchTerm}`)}
        >
          <img src="https://media.istockphoto.com/id/2065067084/vector/3d-orange-magnifying-glass-icon-isolated-on-gray-background-render-minimal-transparent-loupe.jpg?s=612x612&w=0&k=20&c=lB7ASdrCl0uTWdXVlFILfuiLtL2EH6zYDqXpnT48n84=" alt="search" />
        </button>
      </div>

      <div className="navbar__right">
        <Link to="/" className="navbar__link">
          Home
        </Link>
        <Link to="/cart" className="navbar__link">
          Cart
        </Link>

        {user?.role === "provider" && (
          <Link to="/add-product" className="navbar__link">
            Add Product
          </Link>
        )}

        {user?.role === "user" && (
          <Link to="/request-provider" className="navbar__link">
            Become a Provider
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/requests" className="navbar__link">
            Requests
          </Link>
        )}

        {isLoggedIn ? (
          <button className="navbar__btn" onClick={handleLogout}>
            LogOut
          </button>
        ) : (
          <>
            <Link to="/login" className="navbar__link">
              Sign In
            </Link>
            <Link to="/register" className="navbar__link">
              Create Account
            </Link>
          </>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
