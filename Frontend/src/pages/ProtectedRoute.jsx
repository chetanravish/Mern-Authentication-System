import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

export default function ProtectedRoute({ children }) {
  const { accessToken, loading } = useContext(AuthContext);

  // Wait until refresh-token check finishes
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Checking authentication...</div>
      </div>
    );
  }

  // No access token → back to Home
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  // Authenticated
  return children;
}