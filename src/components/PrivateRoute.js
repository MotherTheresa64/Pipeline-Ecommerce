import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const PrivateRoute = ({ children }) => {
    // Get current user from authentication context
    const { user } = useAuthContext();
    // If user is not authenticated, redirect to the login page
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // If user is authenticated, render the protected child components
    return children;
};
export default PrivateRoute;
