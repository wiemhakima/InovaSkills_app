import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  // Décoder le token pour extraire les informations de rôle
  const decodeToken = JSON.parse(atob(token.split(".")[1])); // Décoder le token JWT
  const isAdmin = decodeToken?.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
