import { useEffect, useState } from "react";
import { fetchAppointmentsAPI } from "../api/appointmentApi";
import { useAuth } from "../context/AuthContext";

export default function CustomerMyBookings() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const allAppointments = await fetchAppointmentsAPI();
    const myAppointments = allAppointments.filter(
      (a) => Number(a.customerId) === Number(user.customerId)
    );
    setAppointments(myAppointments);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Bookings</h1>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No Active booking from you.</p>
      ) : (
        <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="border p-2">Service</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border p-2">{a.serviceName}</td>
                <td className="border p-2">{a.date}</td>
                <td className="border p-2">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
