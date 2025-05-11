import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProviderRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/provider-request") 
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch requests:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateStatus = (id, status) => {
    api
      .put(`/provider-request/${id}`, { status })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status } : req
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update status", err);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Provider Requests</h2>
      {requests.length === 0 ? (
        <p>No provider requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
            <p><strong>User:</strong> {req.userId?.username} ({req.userId?.email})</p>
            <p><strong>Store:</strong> {req.storeName}</p>
            <p><strong>Description:</strong> {req.storeDescription}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === "pending" && (
              <div>
                <button onClick={() => updateStatus(req._id, "approved")}>✅ Approve</button>
                <button onClick={() => updateStatus(req._id, "rejected")}>❌ Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
