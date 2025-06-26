import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Header = () => {
    return (
    // Main header element with background color, text color, padding, and margin-bottom
    _jsx("header", { className: "bg-gray-900 text-white p-4 mb-4", children: _jsx("nav", { children: _jsxs("ul", { className: "flex space-x-4", children: [_jsx("li", { children: _jsx(Link, { to: "/", children: "Home" }) }), _jsx("li", { children: _jsx(Link, { to: "/products", children: "Products" }) }), _jsx("li", { children: _jsx(Link, { to: "/checkout", children: "Checkout" }) }), _jsx("li", { children: _jsx(Link, { to: "/orders", children: "Orders" }) }), _jsx("li", { children: _jsx(Link, { to: "/profile", children: "Profile" }) })] }) }) }));
};
export default Header;
