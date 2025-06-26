import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearCart, selectCartItems, selectTotalPrice } from "../features/cart/cartSlice";
import { createOrder } from "../pages/orders/orderService";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
    const dispatch = useAppDispatch();
    // Select cart items and total price from Redux store
    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectTotalPrice);
    // Get current authenticated user from auth context
    const { user } = useAuthContext();
    const navigate = useNavigate();
    // Handler to process checkout
    const handleCheckout = async () => {
        // Require user to be logged in
        if (!user) {
            alert("Please log in to complete checkout.");
            return;
        }
        // Require cart to have items
        if (items.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        // Sanitize cart items for Firestore by ensuring all fields are defined
        const sanitizedItems = items.map(item => ({
            id: item.id ?? "",
            name: item.name ?? "",
            price: item.price ?? 0,
            quantity: item.quantity ?? 1,
            image: item.image ?? "",
        }));
        // Construct order object with user ID, items, total, and current timestamp
        const order = {
            userId: user.uid,
            items: sanitizedItems,
            total,
            createdAt: new Date(),
        };
        try {
            console.log("Submitting order:", order);
            // Send order to Firestore
            await createOrder(order);
            // Clear the cart after successful order submission
            dispatch(clearCart());
            alert("Order placed successfully!");
            // Navigate to orders page to show user their orders
            navigate("/orders");
        }
        catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Checkout" }), _jsxs("p", { className: "mb-2", children: ["Total: ", _jsxs("strong", { children: ["$", total.toFixed(2)] })] }), _jsx("button", { onClick: handleCheckout, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", children: "Confirm Purchase" })] }));
};
export default Checkout;
