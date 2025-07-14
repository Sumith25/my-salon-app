import React from 'react';

export default function Navbar({ user, onLogout, onNavigate }) {
  return (
    <nav className="flex justify-between items-center bg-pink-600 text-white p-4">
      <h1 className="font-bold text-xl">Glamour Salon</h1>
      <div className="space-x-4">
        <button onClick={() => onNavigate('home')} className="hover:underline">Home</button>
        {!user && (
          <>
            <button onClick={() => onNavigate('loginCustomer')} className="hover:underline">
              Customer Login
            </button>
            <button onClick={() => onNavigate('loginStaff')} className="hover:underline">
              Staff/Admin Login
            </button>
            <button onClick={() => onNavigate('register')} className="hover:underline">
              Register
            </button>
          </>
        )}
        {user && (
          <button onClick={onLogout} className="hover:underline">
            Logout ({user.username})
          </button>
        )}
      </div>
    </nav>
  );
}
