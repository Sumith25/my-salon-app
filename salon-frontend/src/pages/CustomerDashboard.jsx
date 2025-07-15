import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.username}</h1>
      <div className="flex flex-col gap-3 w-80">
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => navigate("/customer/services")}
        >
          View Available Services
        </button>
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => navigate("/customer/appointments")}
        >
          My Bookings
        </button>
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => navigate("/customer/book")}
        >
          Book New Appointment
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
