import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts, removeProduct } from "./productSlice";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useAuthContext } from "../../context/AuthContext";
import type { Product } from "../../types";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Select products list from Redux store
  const { list } = useAppSelector((state) => state.products) as { list: Product[] };

  // Select cart items from Redux store
  const cartItems = useAppSelector((state) => state.cart.items);

  // Get current user from auth context
  const { user } = useAuthContext();

  // Fetch product list on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Confirm and delete product (admin only)
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(removeProduct(id));
    }
  };

  // Check if logged-in user is admin by email
  const isAdmin = user?.email === "admin@example.com";

  // Get quantity of a product currently in the cart
  const getQuantityInCart = (productId: string) => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item ? item.quantity : 0;
  };

  // Add product to cart; redirect to login if not authenticated
  const handleAdd = (product: Product) => {
    console.log("Add to cart clicked for product:", product.name, "User logged in?", !!user);
    if (!user) {
      console.log("User not logged in, redirecting to login page.");
      navigate("/login", { state: { fromProductId: product.id } });
      return;
    }
    dispatch(addToCart(product));
  };

  // Remove product from cart
  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-4">
      {/* Page title */}
      <h2 className="text-xl font-bold mb-4">Product List</h2>

      {/* Admin-only "Add Product" button linking to product creation page */}
      {isAdmin && (
        <Link
          to="/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          Add Product
        </Link>
      )}

      {/* Render list of products */}
      {list.map((product) => {
        // Get current quantity in cart for this product
        const quantity = getQuantityInCart(product.id);

        return (
          <div key={product.id} className="mb-4 border p-4 rounded shadow bg-gray-900">
            {/* ProductCard component shows product details and controls */}
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              quantity={quantity}
              onAdd={() => handleAdd(product)}
              onRemove={() => handleRemove(product.id)}
            />

            {/* Admin-only buttons to edit or delete the product */}
            {isAdmin && (
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/products/edit/${product.id}`}
                  className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
