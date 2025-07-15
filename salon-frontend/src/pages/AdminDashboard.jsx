import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="flex flex-col gap-4 w-80">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => navigate("/admin/customers")}
        >
          Customer Management
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => navigate("/admin/services")}
        >
          Services Management
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => navigate("/admin/products")}
        >
          Product Management
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => navigate("/admin/staff")}
        >
          Staff Management
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
          onClick={() => navigate("/admin/appointments")}
        >
          Appointments / Booking Management
        </button>
      </div>
    </div>
  );
}