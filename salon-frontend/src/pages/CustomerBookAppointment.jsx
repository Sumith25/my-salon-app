import { useState } from "react";
import { addAppointmentAPI } from "../api/appointmentApi";
import { useAuth } from "../context/AuthContext";

export default function CustomerBookAppointment() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerId: user.customerId || "",
    customerName: user.username || "",
    serviceName: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAppointmentAPI(formData);
    alert("Appointment booked successfully");
    setFormData({
      customerId: user.customerId,
      customerName: user.username,
      serviceName: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <input
          type="text"
          name="serviceName"
          placeholder="Service Name"
          value={formData.serviceName}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Book
        </button>
      </form>
    </div>
  );
}
