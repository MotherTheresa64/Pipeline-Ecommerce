import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Cart = () => {
  // Select cart items array from Redux store's cart slice state
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="p-4">
      {/* Cart title */}
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {/* List of items in the cart */}
      <ul>
        {cartItems.map((item, idx) => (
          <li key={idx}>
            {/* Display product name, quantity, and total price per item */}
            {item.name} x {item.quantity} — ${item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
