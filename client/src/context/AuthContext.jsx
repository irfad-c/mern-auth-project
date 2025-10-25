import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //This helps users stay logged in even after refreshing the page.
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  /**Before showing your app, it verifies if the user’s login token is still valid.While checking, it displays a “Loading...” message instead of the full app. */

  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    //It clears the user data from memory.
    setUser(null);
    localStorage.removeItem("user");
  };

  //used here to check if a user is already logged in
  //verify user on page refresh
  useEffect(() => {
    const verify = async () => {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored?.token) {
        try {
          //checking to ensure that token is valid
          const res = await API.get("/auth/verify");
          setUser({ ...res.data.user, token: stored.token });
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) return <div className="center">Loading...</div>;
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
