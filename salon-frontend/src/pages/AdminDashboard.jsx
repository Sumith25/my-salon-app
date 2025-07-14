import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="flex flex-col gap-3 w-80">
        <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/admin/customers")}>Customer Management</button>
        <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/admin/services")}>Services Management</button>
        <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/admin/products")}>Product Management</button>
        <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/admin/staff")}>Staff Management</button>
        <button className="bg-blue-500 text-white p-2" onClick={() => navigate("/admin/appointments")}>Appointments / Booking Management</button>
      </div>
    </div>
  );
}
