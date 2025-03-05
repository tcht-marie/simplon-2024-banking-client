import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getTransactions,
  createTransaction,
} from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import { getPaymentMethods } from "../services/paymentMethodService";
import Modal from "./Modal";
import { Link } from "react-router-dom";

export default function TransactionList() {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: null,
    date: new Date().toISOString().split("T")[0],
    categoryId: null,
    paymentMethodId: null,
  });

  useEffect(() => {
    if (auth) {
      Promise.all([
        getTransactions(auth),
        getCategories(auth),
        getPaymentMethods(auth),
      ]).then(([transactionsData, categoriesData, paymentMethodsData]) => {
        setTransactions(transactionsData);
        setCategories(categoriesData);
        setPaymentMethods(paymentMethodsData);
      });
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(auth, formData);
      const updatedTransactions = await getTransactions(auth);
      setTransactions(updatedTransactions);
      setShowNewForm(false);
      setFormData({
        title: "",
        description: "",
        amount: null,
        date: new Date().toISOString().split("T")[0],
        categoryId: null,
        paymentMethodId: null,
      });
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString("en-EU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date.substring(0, 10);
    if (!groups[date]) groups[date] = [];
    groups[date].push(transaction);
    return groups;
  }, {});

  const getCategoryColor = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : "#gray";
  };

  return (
    <div className="transaction-list" aria-label="Transaction List">
      <section className="list-header">
        <h2>Transactions</h2>
        <button className="fab-button" onClick={() => setShowNewForm(true)}>
          +
        </button>
      </section>
      <section className="transaction-list-text">
        <p className="transaction-text">
          Before adding a transaction, please add a payment method.
        </p>
        <Link to="/payment-methods" className="transaction-text-link">
          <p className="transaction-text">
            You can click here to go to payment methods page.
          </p>
        </Link>
      </section>

      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} className="date-group" aria-label="Date Group">
          <h3>{date}</h3>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="transaction-item"
              aria-label="Transaction Item"
            >
              <div
                className="category-color-indicator"
                aria-label="Category Color Indicator"
                style={{
                  backgroundColor: getCategoryColor(transaction.categoryId),
                }}
              />
              <div
                className="transaction-content"
                aria-label="Transaction Content"
              >
                <div
                  className="transaction-title"
                  aria-label="Transaction Title"
                >
                  {transaction.title}
                </div>
                <div
                  className="transaction-amount"
                  aria-label="Transaction Amount"
                >
                  {formatAmount(transaction.amount)}€
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <Modal
        isOpen={showNewForm}
        onClose={() => setShowNewForm(false)}
        title="New Transaction"
      >
        <form onSubmit={handleSubmit} className="transaction-form">
          <input
            type="text"
            aria-label="Title Input"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <input
            type="number"
            aria-label="Amount Input"
            placeholder="Amount"
            value={formData.amount || ""}
            step="0.01"
            onChange={(e) =>
              setFormData({ ...formData, amount: Number(e.target.value) })
            }
            required
          />
          <input
            type="date"
            aria-label="Date Input"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: Number(e.target.value) })
            }
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={formData.paymentMethodId}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethodId: Number(e.target.value),
              })
            }
            required
          >
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name} (**** **** **** {method.lastDigits})
              </option>
            ))}
          </select>
          <button type="submit">Create Transaction</button>
        </form>
      </Modal>
    </div>
  );
}
