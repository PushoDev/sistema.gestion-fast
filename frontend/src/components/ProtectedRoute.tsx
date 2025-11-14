import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TaskProvider } from "../context/TaskContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
};
