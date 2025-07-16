import { useEffect, useState } from "react";
import {
  fetchStaffAPI,
  addStaffAPI,
  updateStaffAPI,
  deleteStaffAPI,
} from "../api/staffApi";

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", phone: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "", phone: "" });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const data = await fetchStaffAPI();
    setStaff(data);
  };

  const handleAddChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addStaffAPI(newStaff);
    setNewStaff({ name: "", role: "", phone: "" });
    fetchStaff();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateStaffAPI(editingId, editData);
    setEditingId(null);
    fetchStaff();
  };

  const handleDelete = async (id) => {
    await deleteStaffAPI(id);
    fetchStaff();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Staff Management</h1>
      <form onSubmit={handleAddSubmit} className="grid grid-cols-3 gap-2 mb-6">
        <input type="text" name="name" placeholder="Staff Name" value={newStaff.name} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="role" placeholder="Role" value={newStaff.role} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="phone" placeholder="Phone" value={newStaff.phone} onChange={handleAddChange} className="border p-2" required />
        <button type="submit" className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Add Staff</button>
      </form>
      <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-2">{editingId === s.id ? <input name="name" value={editData.name} onChange={handleEditChange} className="border p-1 w-full" /> : s.name}</td>
              <td className="border p-2">{editingId === s.id ? <input name="role" value={editData.role} onChange={handleEditChange} className="border p-1 w-full" /> : s.role}</td>
              <td className="border p-2">{editingId === s.id ? <input name="phone" value={editData.phone} onChange={handleEditChange} className="border p-1 w-full" /> : s.phone}</td>
              <td className="border p-2 flex gap-2">
                {editingId === s.id ? (
                  <>
                    <button onClick={handleEditSubmit} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(s.id); setEditData(s); }} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:underline">Delete</button>
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
