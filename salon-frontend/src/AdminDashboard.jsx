import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-4">Admin / Staff Dashboard</h2>
      <p className="text-gray-600">Welcome! From here you can manage appointments, customers, and services.</p>
      <div className="mt-8 space-y-4">
        <button className="block w-64 mx-auto bg-pink-600 text-white py-2 rounded">View Appointments</button>
        <button className="block w-64 mx-auto bg-pink-600 text-white py-2 rounded">Manage Customers</button>
        <button className="block w-64 mx-auto bg-pink-600 text-white py-2 rounded">Manage Services</button>
      </div>
    </div>
  );
}
