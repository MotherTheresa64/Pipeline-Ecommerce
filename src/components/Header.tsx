import { Link } from 'react-router-dom';

const Header = () => {
  return (
    // Main header element with background color, text color, padding, and margin-bottom
    <header className="bg-gray-900 text-white p-4 mb-4">
      <nav>
        {/* Horizontal navigation menu with spacing between links */}
        <ul className="flex space-x-4">
          {/* Navigation links using React Router's Link component for client-side routing */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
