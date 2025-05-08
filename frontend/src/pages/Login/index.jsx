import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const res = await api.post("auth/login", { email, password });

      //success loging save token
      loginUser(res.data.token);

      //redirect
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "invalid emil or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
          Passwrod
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <button type="submit" disabled={loading}>
            {loading ? "logging in..." : "login"}
          </button>
        </label>
      </form>
    </div>
  );
};

export default Login;
