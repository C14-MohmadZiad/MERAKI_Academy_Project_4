import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export default function RequestProvider() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!user?.id) {
      toast.error("User ID not received. Please login again.");
      return;
    }

    if (!storeName.trim() || !storeDescription.trim()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/users/request-provider", {
        userId: user.id,
        storeName,
        storeDescription,
      });

      toast.success("Your request has been submitted for review.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Failed to send upgrade request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-provider-container">
      <h2>Request Provider Access</h2>

      <label>
        Store Name
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Enter your store name"
        />
      </label>

      <label>
        Description
        <textarea
          value={storeDescription}
          onChange={(e) => setStoreDescription(e.target.value)}
          placeholder="Describe your store"
        />
      </label>

      <button onClick={handleRequest} disabled={loading}>
        {loading ? "Sending..." : "Submit Request"}
      </button>

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
