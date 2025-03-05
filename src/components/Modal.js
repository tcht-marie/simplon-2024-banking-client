import React from "react";
import "./Modal.css";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" aria-label="Modal overlay">
      <div className="modal-content" aria-label="Modal content">
        <div className="modal-header" aria-label="Modal header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body" aria-label="Modal body">
          {children}
        </div>
      </div>
    </div>
  );
}
