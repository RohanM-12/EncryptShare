import React from "react";
import { useAuth } from "../context/authcontext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [auth] = useAuth();

  if (auth.user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
