import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuthContext();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
