import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import "./style.css";
const Navbar = () => {
    const { isLoggedIn, logoutUser,user}  = useContext(AuthContext)
    console.log("USER", user);

  return (
    
    <nav>
      <div>
        <Link to="/">MZ-Store</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user?.role === "provider" && (
          <Link to="/add-product">Add Product</Link>
          
        )}
        {isLoggedIn?(
          

 <button onClick={logoutUser}>LogOut</button>
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
