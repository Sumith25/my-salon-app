import { useEffect, useState } from "react";
import {
  fetchAppointmentsAPI,
  deleteAppointmentAPI,
  updateAppointmentAPI,
} from "../api/appointmentApi";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    customerName: "",
    serviceName: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await fetchAppointmentsAPI();
    setAppointments(data);
  };

  const handleDelete = async (id) => {
    await deleteAppointmentAPI(id);
    fetchAppointments();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateAppointmentAPI(editingId, editData);
    setEditingId(null);
    fetchAppointments();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Appointments Management</h1>
      <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="border p-2">
                {editingId === a.id ? (
                  <input
                    name="customerName"
                    value={editData.customerName}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  a.customerName
                )}
              </td>
              <td className="border p-2">
                {editingId === a.id ? (
                  <input
                    name="serviceName"
                    value={editData.serviceName}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  a.serviceName
                )}
              </td>
              <td className="border p-2">
                {editingId === a.id ? (
                  <input
                    name="date"
                    type="date"
                    value={editData.date}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  a.date
                )}
              </td>
              <td className="border p-2">
                {editingId === a.id ? (
                  <input
                    name="time"
                    type="time"
                    value={editData.time}
                    onChange={handleEditChange}
                    className="border p-1 w-full"
                  />
                ) : (
                  a.time
                )}
              </td>
              <td className="border p-2 flex gap-2">
                {editingId === a.id ? (
                  <>
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(a.id);
                        setEditData(a);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
