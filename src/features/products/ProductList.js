import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts, removeProduct } from "./productSlice";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { useAuthContext } from "../../context/AuthContext";
const ProductList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // Select products list from Redux store
    const { list } = useAppSelector((state) => state.products);
    // Select cart items from Redux store
    const cartItems = useAppSelector((state) => state.cart.items);
    // Get current user from auth context
    const { user } = useAuthContext();
    // Fetch product list on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    // Confirm and delete product (admin only)
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            dispatch(removeProduct(id));
        }
    };
    // Check if logged-in user is admin by email
    const isAdmin = user?.email === "admin@example.com";
    // Get quantity of a product currently in the cart
    const getQuantityInCart = (productId) => {
        const item = cartItems.find((ci) => ci.id === productId);
        return item ? item.quantity : 0;
    };
    // Add product to cart; redirect to login if not authenticated
    const handleAdd = (product) => {
        console.log("Add to cart clicked for product:", product.name, "User logged in?", !!user);
        if (!user) {
            console.log("User not logged in, redirecting to login page.");
            navigate("/login", { state: { fromProductId: product.id } });
            return;
        }
        dispatch(addToCart(product));
    };
    // Remove product from cart
    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Product List" }), isAdmin && (_jsx(Link, { to: "/products/add", className: "bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block", children: "Add Product" })), list.map((product) => {
                // Get current quantity in cart for this product
                const quantity = getQuantityInCart(product.id);
                return (_jsxs("div", { className: "mb-4 border p-4 rounded shadow bg-gray-900", children: [_jsx(ProductCard, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: quantity, onAdd: () => handleAdd(product), onRemove: () => handleRemove(product.id) }), isAdmin && (_jsxs("div", { className: "mt-2 flex gap-2", children: [_jsx(Link, { to: `/products/edit/${product.id}`, className: "bg-blue-600 text-white px-2 py-1 rounded text-sm", children: "Edit" }), _jsx("button", { onClick: () => handleDelete(product.id), className: "bg-red-600 text-white px-2 py-1 rounded text-sm", children: "Delete" })] }))] }, product.id));
            })] }));
};
export default ProductList;
