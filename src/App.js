import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/orders/Orders";
import AddProduct from "./features/products/AddProduct";
import EditProduct from "./features/products/EditProduct";
import ProductList from "./features/products/ProductList";
import UserProfile from "./pages/profile/UserProfile";
const App = () => {
    return (
    // Wrap the app with authentication context provider
    _jsx(AuthProvider, { children: _jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/products", element: _jsx(ProductList, {}) }), _jsx(Route, { path: "/products/add", element: _jsx(PrivateRoute, { children: _jsx(AddProduct, {}) }) }), _jsx(Route, { path: "/products/edit/:id", element: _jsx(PrivateRoute, { children: _jsx(EditProduct, {}) }) }), _jsx(Route, { path: "/checkout", element: _jsx(PrivateRoute, { children: _jsx(Checkout, {}) }) }), _jsx(Route, { path: "/orders", element: _jsx(PrivateRoute, { children: _jsx(Orders, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(PrivateRoute, { children: _jsx(UserProfile, {}) }) })] })] }) }));
};
export default App;
