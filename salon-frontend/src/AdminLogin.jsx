import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      onLogin();
    } else {
      setError(data.error || 'Invalid login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full border p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" className="w-full border p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">Login</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default AdminLogin;