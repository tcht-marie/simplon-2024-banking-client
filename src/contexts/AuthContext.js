import React, { createContext, useState, useContext } from "react";
import * as loginService from "../services/loginService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (username, password) => {
    try {
      const data = await loginService.login(username, password);
      localStorage.setItem("accessToken", JSON.stringify(data));
      setAuth(data);
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const data = await loginService.register(username, password);
      localStorage.setItem("accessToken", JSON.stringify(data));
      setAuth(data);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
