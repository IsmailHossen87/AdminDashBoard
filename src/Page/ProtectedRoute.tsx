import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("accessToken"); 


  if (token) {
    return <Outlet />;
  }

  // If token does not exist, redirect to login
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
