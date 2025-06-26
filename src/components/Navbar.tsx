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
    <nav className="bg-gray-900 text-white py-4 px-8 shadow-md flex justify-between items-center">
      
      {/* Left side navigation links with spacing */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/products" className="hover:text-blue-400">Products</Link>
        <Link to="/checkout" className="hover:text-blue-400">Checkout</Link>
        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
        <Link to="/profile" className="hover:text-blue-400">Profile</Link>
      </div>
      
      {/* Right side user info and auth controls */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Show signed-in user's email */}
            <span className="text-sm text-gray-300">
              Signed in as: <strong>{user.email}</strong>
            </span>
            {/* Logout button triggers logout and redirects */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          // If no user logged in, show Login link styled as a button
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
