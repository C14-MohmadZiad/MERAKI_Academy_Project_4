import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import NotFound from "./pages/NotFound";

import Home from "./pages/Home";

import "./App.css";

const App = () => {
  return (

    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
