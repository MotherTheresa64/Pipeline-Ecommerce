import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Navbar = () => {
    // Destructure user and logout function from custom auth context
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    // Handles user logout and redirects to login page
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
    // Navbar container with background, text color, padding, shadow, and flex layout
    _jsxs("nav", { className: "bg-gray-900 text-white py-4 px-8 shadow-md flex justify-between items-center", children: [_jsxs("div", { className: "flex gap-6", children: [_jsx(Link, { to: "/", className: "hover:text-blue-400", children: "Home" }), _jsx(Link, { to: "/products", className: "hover:text-blue-400", children: "Products" }), _jsx(Link, { to: "/checkout", className: "hover:text-blue-400", children: "Checkout" }), _jsx(Link, { to: "/orders", className: "hover:text-blue-400", children: "Orders" }), _jsx(Link, { to: "/profile", className: "hover:text-blue-400", children: "Profile" })] }), _jsx("div", { className: "flex items-center gap-4", children: user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-sm text-gray-300", children: ["Signed in as: ", _jsx("strong", { children: user.email })] }), _jsx("button", { onClick: handleLogout, className: "bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded", children: "Logout" })] })) : (
                // If no user logged in, show Login link styled as a button
                _jsx(Link, { to: "/login", className: "bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded", children: "Login" })) })] }));
};
export default Navbar;
