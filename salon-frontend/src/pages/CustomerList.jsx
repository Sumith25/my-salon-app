import { useEffect, useState } from "react";
import {
  fetchCustomersAPI,
  deleteCustomerAPI,
  updateCustomerAPI,
} from "../api/customerApi";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editData, setEditData] = useState({
    name: "", email: "", phone: "", gender: "", address: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "", email: "", phone: "", gender: "", address: "", password: ""
  });

  const fetchCustomers = async () => {
    try {
      const data = await fetchCustomersAPI();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch customers.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await deleteCustomerAPI(id);
    fetchCustomers();
  };

  const startEdit = (customer) => {
    setEditingCustomerId(customer.id);
    setEditData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      gender: customer.gender,
      address: customer.address,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateCustomerAPI(editingCustomerId, editData);
    setEditingCustomerId(null);
    fetchCustomers();
  };

  const handleNewCustomerChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });
    setNewCustomer({ name: "", email: "", phone: "", gender: "", address: "", password: "" });
    setShowAddForm(false);
    fetchCustomers();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Management</h1>

      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
      >
        {showAddForm ? "Cancel" : "Add New Customer"}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddCustomer} className="grid gap-2 mb-8">
          <input type="text" name="name" placeholder="Name" value={newCustomer.name} onChange={handleNewCustomerChange} className="border p-2" required />
          <input type="email" name="email" placeholder="Email" value={newCustomer.email} onChange={handleNewCustomerChange} className="border p-2" required />
          <input type="text" name="phone" placeholder="Phone" value={newCustomer.phone} onChange={handleNewCustomerChange} className="border p-2" required />
          <input type="text" name="gender" placeholder="Gender" value={newCustomer.gender} onChange={handleNewCustomerChange} className="border p-2" />
          <input type="text" name="address" placeholder="Address" value={newCustomer.address} onChange={handleNewCustomerChange} className="border p-2" />
          <input type="password" name="password" placeholder="Password" value={newCustomer.password} onChange={handleNewCustomerChange} className="border p-2" required />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Customer</button>
        </form>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t">
                {editingCustomerId === customer.id ? (
                  <>
                    <td className="border p-2">
                      <input name="name" value={editData.name} onChange={handleEditChange} className="border w-full p-1" />
                    </td>
                    <td className="border p-2">
                      <input name="email" value={editData.email} onChange={handleEditChange} className="border w-full p-1" />
                    </td>
                    <td className="border p-2">
                      <input name="phone" value={editData.phone} onChange={handleEditChange} className="border w-full p-1" />
                    </td>
                    <td className="border p-2">
                      <input name="gender" value={editData.gender} onChange={handleEditChange} className="border w-full p-1" />
                    </td>
                    <td className="border p-2">
                      <input name="address" value={editData.address} onChange={handleEditChange} className="border w-full p-1" />
                    </td>
                    <td className="border p-2 flex flex-col gap-1">
                      <button className="bg-green-500 text-white py-1 rounded" onClick={handleEditSubmit}>Save</button>
                      <button className="text-gray-500 text-sm" onClick={() => setEditingCustomerId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{customer.name}</td>
                    <td className="border p-2">{customer.email}</td>
                    <td className="border p-2">{customer.phone}</td>
                    <td className="border p-2">{customer.gender}</td>
                    <td className="border p-2">{customer.address}</td>
                    <td className="border p-2 flex gap-2">
                      <button className="text-blue-500" onClick={() => startEdit(customer)}>Edit</button>
                      <button className="text-red-500" onClick={() => handleDelete(customer.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
