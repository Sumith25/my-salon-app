// src/Modal.jsx
import React from 'react';

export default function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}
