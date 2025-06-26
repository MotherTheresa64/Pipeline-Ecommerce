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
    <AuthProvider>
      <Router>
        {/* Navigation bar present on all pages */}
        <Navbar />
        <Routes>
          {/* Public routes accessible without login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />

          {/* Protected routes: Require authentication */}

          {/* Product management - only logged-in users can add/edit */}
          <Route
            path="/products/add"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />

          {/* Checkout, orders, and profile pages require login */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
