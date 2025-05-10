import { createContext, useState, useEffect } from "react";
import api from "../services/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      setIsLoggedIn(true);
      fetchUser(saved);
    }
  }, []);
  const fetchUser = (tok) => {
    api
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${tok}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        logoutUser();
      });
  };
  // when success  we "نستدعي" login
  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    fetchUser(newToken);
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn, user, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
