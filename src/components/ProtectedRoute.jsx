import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner"; // Optional

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute:", { user, loading });

  if (loading) return <Spinner />; // Or <p>Loading...</p>

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
