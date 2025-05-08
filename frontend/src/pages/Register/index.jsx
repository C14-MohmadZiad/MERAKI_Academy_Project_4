import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import "./style.css";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConf] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass !== confirm) {
      setError("Confirm password does not match");
      return;
    }
    if (!country || !age) {
      setError("Please enter Age And Country");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", {
        username,
        firstName,
        lastName,
        email,
        password: pass,
        country,
        age: Number(age),
        role
      });
      //if register success save token and change status
      loginUser(res.data.token);
      //redirect
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Create Account</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          FirstName
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
          UserName
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
          password
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label>
        <label>
          confirmPassword
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
            placeholder="Jordan"
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            placeholder="25"
            required
          />
          <label>
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="user">User</option>
              <option value="provider">Provider</option>
            </select>
          </label>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Registering" : "register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
