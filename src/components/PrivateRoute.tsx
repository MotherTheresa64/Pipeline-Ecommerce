import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// Props interface expects a single React element as a child
interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Get current user from authentication context
  const { user } = useAuthContext();

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the protected child components
  return children;
};

export default PrivateRoute;
