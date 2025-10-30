import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Login thakle dashboard ba nested routes dekhabe
  return <Outlet />;
};

export default ProtectedRoute;
