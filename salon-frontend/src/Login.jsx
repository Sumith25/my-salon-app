import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Login failed');
        return;
      }

      onLogin(data.user); // user object includes role
    } catch {
      setError('Server error, try again later');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Login
      </button>
    </form>
  );
}
