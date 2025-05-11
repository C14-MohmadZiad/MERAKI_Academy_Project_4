import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RequestProvider() {
  const { state } = useLocation();
  const userId = state?.userId || null;
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!userId) {
      alert("User ID not received. Please register again");
      return;
    }
    if (!storeName.trim() || !storeDescription.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/users/request-provider", {
        userId,
        storeName,
        storeDescription,
      });

      alert("Your upgrade request has been processed.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to send upgrade request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
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
    </div>
  );
}
