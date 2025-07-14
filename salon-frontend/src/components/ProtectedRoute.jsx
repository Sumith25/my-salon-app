import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const userRole = sessionStorage.getItem("role");
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
