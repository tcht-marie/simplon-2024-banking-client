import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import CategoryList from "../components/CategoryList";
import PaymentMethodList from "../components/PaymentMethodList";
import { useAuth, AuthProvider } from "../contexts/AuthContext";

function AppContent() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    accessToken && setAuth(JSON.parse(accessToken));
  }, [setAuth]);

  if (!auth) {
    return <Login />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="app-container">
        <div aria-label="Main">
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/payment-methods" element={<PaymentMethodList />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
