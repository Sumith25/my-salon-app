import React, { useState } from 'react';

export default function StaffLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin({ username, role: 'admin' });
    } else if (username === 'staff' && password === 'staff123') {
      onLogin({ username, role: 'staff' });
    } else {
      alert('Invalid staff credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Staff/Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-3 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full"
        />
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded">Login</button>
        <button type="button" onClick={onBack} className="mt-2 w-full text-pink-600">Back</button>
      </form>
    </div>
  );
}
