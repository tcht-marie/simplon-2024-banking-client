import React, { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

export default function Login() {
  // isLogin tell if the page is the login page or the register page
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAuthLoading(true);
      setError("");

      isLogin
        ? await login(username, password).catch(() => setError("Login failed"))
        : await register(username, password).catch(() =>
            setError("Registration failed")
          );

      setAuthLoading(false);
    },
    [isLogin, username, password, login, register, setAuthLoading]
  );

  return (
    <div
      className="login-container"
      aria-label="Container for form login and register"
    >
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <div className="error">{error}</div>}
      {authLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          aria-label="Username field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          aria-label="Password field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="button-login-or-register"
      >
        {isLogin ? "Need to register?" : "Already have an account?"}
      </button>
    </div>
  );
}
