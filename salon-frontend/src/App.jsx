import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerRegistration from "./pages/CustomerRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerList from "./pages/CustomerList";
import ServicesVisitor from "./pages/ServicesVisitor";
import ServicesCustomer from "./pages/ServicesCustomer";
import ServicesAdmin from "./pages/ServicesAdmin";
import CustomerBookAppointment from "./pages/CustomerBookAppointment";
import AdminAppointments from "./pages/AdminAppointments";
import CustomerMyBookings from "./pages/CustomerMyBookings";
import AdminProducts from "./pages/AdminProducts";
import AdminStaff from "./pages/AdminStaff";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CustomerRegistration />} />
          <Route path="/services" element={<ServicesVisitor />} />

          {/* Customer Protected Routes */}
          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/book"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerBookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/services"
            element={
              <ProtectedRoute allowedRole="customer">
                <ServicesCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/appointments"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerMyBookings />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <ProtectedRoute allowedRole="admin">
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute allowedRole="admin">
                <ServicesAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminStaff />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
