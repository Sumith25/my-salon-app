import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRole, children }) {
    const { user } = useAuth();
    if (!user || user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
