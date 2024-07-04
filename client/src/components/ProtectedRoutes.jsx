import React from "react";
import { useAuth } from "../context/authcontext";
import { Navigate, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  return auth?.user ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
