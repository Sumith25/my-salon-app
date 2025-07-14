import React, { useState } from 'react';

export default function CustomerLogin({ onLogin, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'customer' && password === 'pass123') {
      onLogin({ username, role: 'customer' });
    } else {
      alert('Invalid customer credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Customer Login</h2>
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
