import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      setIsLoggedIn(true);
    }
  }, []);

  // when success  we "نستدعي" login
  const loginUser = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ token, isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
