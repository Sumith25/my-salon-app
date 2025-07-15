import { useState } from "react";

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Customer registered successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
          password: "",
        });
      } else {
        setStatus("Failed to register customer.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting to the server.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Customer Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Register
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
}
