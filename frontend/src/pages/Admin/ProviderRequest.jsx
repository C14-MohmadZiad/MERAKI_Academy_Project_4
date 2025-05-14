import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProviderRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all provider requests
  useEffect(() => {
    api
      .get("/users/provider-request")
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch requests:", err);
        toast.error("Error fetching provider requests");
      })
      .finally(() => setLoading(false));
  }, []);

  // Update request status (approve/reject)
  const updateStatus = (id, status) => {
    const confirmMsg =
      status === "approved"
        ? "Are you sure you want to approve this request?"
        : "Are you sure you want to reject this request?";
  
    if (!window.confirm(confirmMsg)) return;
  
    api
      .put(`/users/provider-request/${id}`, { status })
      .then((res) => {
        const updatedRequest = res.data.data;
        toast.success(`Request ${status} successfully`);
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: updatedRequest.status } : req
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update status", err);
        toast.error("Failed to update status");
      });
  };
  

  if (loading) return <p className="text-center py-5">Loading...</p>;

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4">Manage Provider Requests</h2>
      {requests.length === 0 ? (
        <p>No provider requests found.</p>
      ) : (
        <div className="row g-4">
          {requests.map((req) => (
            <div key={req._id} className="col-md-6">
              <div className="card shadow-sm border">
                <div className="card-body">
                  <h5 className="card-title">{req.storeName}</h5>
                  <p className="mb-1">
                    <strong>User:</strong> {req.userId?.username} (
                    {req.userId?.email})
                  </p>
                  <p className="mb-1">
                    <strong>Description:</strong> {req.storeDescription}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        req.status === "approved"
                          ? "bg-success"
                          : req.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>

                  {req.status === "pending" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success"
                        onClick={() => updateStatus(req._id, "approved")}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => updateStatus(req._id, "rejected")}
                      >
                        ❌ Reject
                      </button>
                    </div>
                  )}

                  {req.status !== "pending" && (
                    <div className="text-muted small mt-2">
                      This request has been <strong>{req.status}</strong>.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
