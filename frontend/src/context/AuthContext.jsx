import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  });

  const navigate = useNavigate();
  const setTokens = (tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem("authTokens", JSON.stringify(tokens)); // Persist tokens in localStorage
  };

  const logout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/centroApp/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Send access token to invalidate it
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Error during logout:", err);
    }

    setAuthTokens(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
