import { useEffect, useState } from "react";
import {
  fetchServicesAPI,
  addServiceAPI,
  updateServiceAPI,
  deleteServiceAPI,
} from "../api/serviceApi";

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", cost: "", duration: "" });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", cost: "", duration: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const data = await fetchServicesAPI();
    setServices(data);
  };

  const handleAddChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addServiceAPI(newService);
    setNewService({ name: "", cost: "", duration: "" });
    fetchServices();
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateServiceAPI(editingId, editData);
    setEditingId(null);
    fetchServices();
  };

  const handleDelete = async (id) => {
    await deleteServiceAPI(id);
    fetchServices();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Services Management</h1>
      <form onSubmit={handleAddSubmit} className="grid grid-cols-3 gap-2 mb-6">
        <input type="text" name="name" placeholder="Service Name" value={newService.name} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="cost" placeholder="Cost" value={newService.cost} onChange={handleAddChange} className="border p-2" required />
        <input type="text" name="duration" placeholder="Duration" value={newService.duration} onChange={handleAddChange} className="border p-2" required />
        <button type="submit" className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Add Service</button>
      </form>
      <table className="w-full border-collapse rounded-md border border-gray-300 shadow-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Cost</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-2">{editingId === s.id ? <input name="name" value={editData.name} onChange={handleEditChange} className="border p-1 w-full" /> : s.name}</td>
              <td className="border p-2">{editingId === s.id ? <input name="cost" value={editData.cost} onChange={handleEditChange} className="border p-1 w-full" /> : s.cost}</td>
              <td className="border p-2">{editingId === s.id ? <input name="duration" value={editData.duration} onChange={handleEditChange} className="border p-1 w-full" /> : s.duration}</td>
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
