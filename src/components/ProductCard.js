import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const ProductCard = ({ id, name, price, image, quantity = 0, onAdd, onRemove, }) => {
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
    return (_jsxs("div", { className: "bg-gray-800 p-4 rounded shadow-md", children: [_jsx("img", { src: image, alt: name, className: "w-full h-40 object-cover rounded mb-4", onError: (e) => {
                    e.currentTarget.src = "/placeholder.png";
                } }), _jsx("h3", { className: "text-lg font-semibold mb-1", children: name }), _jsxs("p", { className: "text-gray-300 mb-4", children: ["$", price.toFixed(2)] }), quantity === 0 ? (_jsx("button", { onClick: handleAdd, className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", children: "Add to Cart" })) : (
            // If quantity > 0, show buttons to increase/decrease quantity and current quantity display
            _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: onRemove, className: "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-bold", children: "-" }), _jsx("span", { className: "text-green-400 font-semibold", children: quantity }), _jsx("button", { onClick: handleAdd, className: "bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 font-bold", children: "+" })] }))] }));
};
export default ProductCard;
