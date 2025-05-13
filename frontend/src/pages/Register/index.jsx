import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import "./style.css";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const [role, setRole] = useState("user");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConf] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pass !== confirm) {
      setError("Confirm password does not match");
      return;
    }
    if (!country || !age) {
      setError("Please enter Age And Country");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        firstName,
        lastName,
        username,
        email,
        password: pass,
        country,
        age: Number(age),
        role: "user",
      });

      console.log("Register response:", res.data);

      loginUser(res.data.token);

      if (role === "provider") {
        navigate("/request-provider");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}

      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          User Name
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConf(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Jordan"
          />
        </label>
        <label>
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            required
            placeholder="25"
          />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
