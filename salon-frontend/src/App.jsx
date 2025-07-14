import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import CustomerLogin from './CustomerLogin';
import StaffLogin from './StaffLogin';
import RegisterCustomer from './RegisterCustomer';
import BookingForm from './BookingForm';
import AdminDashboard from './AdminDashboard';
import { getUser, clearUser } from './utils/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home'); // home, loginCustomer, loginStaff, register, dashboard, booking

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      setPage('dashboard');
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage('dashboard');
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setPage('home');
  };

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const handleRegisterSuccess = () => {
    setPage('loginCustomer');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} onNavigate={handleNavigate} />

      <main className="min-h-screen bg-gray-100 p-4 max-w-4xl mx-auto">
        {page === 'home' && (
          <Home
            onNavigateToCustomerLogin={() => setPage('loginCustomer')}
            onNavigateToStaffLogin={() => setPage('loginStaff')}
            onNavigateToBooking={() => setPage('booking')}
            onNavigateToRegister={() => setPage('register')}
          />
        )}

        {page === 'loginCustomer' && !user && (
          <CustomerLogin onLogin={handleLogin} onBack={() => setPage('home')} />
        )}

        {page === 'loginStaff' && !user && (
          <StaffLogin onLogin={handleLogin} onBack={() => setPage('home')} />
        )}

        {page === 'register' && !user && (
          <RegisterCustomer
            onRegisterSuccess={handleRegisterSuccess}
            onCancel={() => setPage('home')}
          />
        )}

        {page === 'dashboard' && user && (
          user.role === 'admin' || user.role === 'staff'
            ? <AdminDashboard />
            : <BookingForm />
        )}

        {page === 'booking' && <BookingForm />}
      </main>
    </>
  );
}
