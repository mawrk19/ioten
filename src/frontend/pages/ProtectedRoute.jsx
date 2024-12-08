import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  return currentUser ? children : <Navigate to="/no-account" replace />;
};

export default ProtectedRoute;
 