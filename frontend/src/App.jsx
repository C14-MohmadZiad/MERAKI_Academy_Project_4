// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestProvider from "./pages/RequestProvider";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderRequests from "./pages/Admin/ProviderRequest";
import ThankYou from "./pages/Thank/ThankYou.jsx";
import Shop from "./pages/Shop/index.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* — Public routes — */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/thankyou" element={<ThankYou />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* — Provider signup continuation (public) — */}
          <Route path="/request-provider" element={<RequestProvider />} />

          {/* — Authenticated routes — */}
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* — Provider-only route — */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-provider"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <RequestProvider />
              </ProtectedRoute>
            }
          />

          {/* admin only */}
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProviderRequests />
              </ProtectedRoute>
            }
          />

          {/* — Catch-all — */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
