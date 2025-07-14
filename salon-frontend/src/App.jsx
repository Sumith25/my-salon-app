import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerRegistration from "./pages/CustomerRegistration";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerList from "./pages/CustomerList";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<CustomerRegistration />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin/customers" element={<CustomerList />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/products" element={<h1>Product Management (Coming Soon)</h1>} />
        <Route path="/admin/staff" element={<h1>Staff Management (Coming Soon)</h1>} />
        <Route path="/admin/appointments" element={<h1>Appointments / Bookings (Coming Soon)</h1>} />

      </Routes>
    </div>
  );
}

export default App;
