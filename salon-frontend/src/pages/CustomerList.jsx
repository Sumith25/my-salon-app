import { useEffect, useState } from "react";
import {
  fetchCustomersAPI,
  deleteCustomerAPI,
  updateCustomerAPI,
} from "../api/customerApi";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "", gender: "", address: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await fetchCustomersAPI();
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    await deleteCustomerAPI(id);
    fetchCustomers();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateCustomerAPI(editingId, editData);
    setEditingId(null);
    fetchCustomers();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Customer Management</h1>
      <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border p-2">{editingId === c.id ? <input name="name" value={editData.name} onChange={handleEditChange} className="border p-1 w-full" /> : c.name}</td>
              <td className="border p-2">{editingId === c.id ? <input name="email" value={editData.email} onChange={handleEditChange} className="border p-1 w-full" /> : c.email}</td>
              <td className="border p-2">{editingId === c.id ? <input name="phone" value={editData.phone} onChange={handleEditChange} className="border p-1 w-full" /> : c.phone}</td>
              <td className="border p-2">{editingId === c.id ? <input name="gender" value={editData.gender} onChange={handleEditChange} className="border p-1 w-full" /> : c.gender}</td>
              <td className="border p-2">{editingId === c.id ? <input name="address" value={editData.address} onChange={handleEditChange} className="border p-1 w-full" /> : c.address}</td>
              <td className="border p-2">
                {editingId === c.id ? (
                  <>
                    <button onClick={handleEditSubmit} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded mr-2">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(c.id); setEditData(c); }} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:underline ml-2">Delete</button>
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
