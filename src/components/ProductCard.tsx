import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

// Props interface defining product info and cart interaction handlers
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Quantity of this product in the cart, default is 0
  onAdd?: () => void;   // Callback when adding this product to cart
  onRemove?: () => void; // Callback when removing this product from cart
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  quantity = 0,
  onAdd,
  onRemove,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Handle add to cart button click
  const handleAdd = () => {
    console.log("handleAdd clicked", { user });
    if (!user) {
      // If user not logged in, redirect to login page
      // Pass the current product ID in location state for potential redirect after login
      console.log("No user, redirecting to login");
      navigate("/login", { state: { fromProductId: id } });
      return;
    }
    // If logged in, call onAdd callback if provided
    onAdd?.();
  };

  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      {/* Product image with fallback to placeholder on error */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded mb-4"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
        }}
      />
      {/* Product name and price */}
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <p className="text-gray-300 mb-4">${price.toFixed(2)}</p>

      {/* Render Add to Cart button if quantity is zero */}
      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      ) : (
        // If quantity > 0, show buttons to increase/decrease quantity and current quantity display
        <div className="flex items-center gap-2">
          <button
            onClick={onRemove}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-bold"
          >
            -
          </button>
          <span className="text-green-400 font-semibold">{quantity}</span>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
