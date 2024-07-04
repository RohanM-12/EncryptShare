import React from "react";
import { useAuth } from "../context/authcontext";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const [auth] = useAuth();
  console.log(auth);

  return auth?.user ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
