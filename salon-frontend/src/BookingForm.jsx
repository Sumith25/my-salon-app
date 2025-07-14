import React, { useState } from 'react';
import Modal from './Modal';

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to book appointment');

      setModalMessage('Your appointment has been booked successfully!');
      setShowModal(true);
      setFormData({ name: '', phone: '', service: '' });
    } catch (err) {
      setModalMessage('Error booking appointment. Please try again.');
      setShowModal(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="service"
          placeholder="Service Required"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Book Now
        </button>
      </form>

      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </>
  );
}
