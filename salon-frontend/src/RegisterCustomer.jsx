import React, { useState } from 'react';

export default function RegisterCustomer({ onRegisterSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      alert('Registered successfully! Now please login.');
      onRegisterSuccess();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Register New Customer</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 mb-3 w-full"
        />
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded">Register</button>
        <button type="button" onClick={onCancel} className="mt-2 w-full text-pink-600">Back</button>
      </form>
    </div>
  );
}
