import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuthContext();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // No roles required → allow any logged-in user
  if (!roles) {
    return children;
  }

  // Ensure roles is always an array
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  // Role check
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
