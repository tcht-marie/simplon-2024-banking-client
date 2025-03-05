import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar">
      <h1 className="nav-brand">Finance Tracker</h1>
      <div className="nav-links">
        <Link to="/" className={isActive("/")}>
          Transactions
        </Link>
        <Link to="/categories" className={isActive("/categories")}>
          Categories
        </Link>
        <Link to="/payment-methods" className={isActive("/payment-methods")}>
          Payment Methods
        </Link>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </div>
    </nav>
  );
}
