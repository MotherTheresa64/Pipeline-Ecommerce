import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/orders/OrderDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "./orderService";
const OrderDetails = () => {
    // Get order ID from route parameters
    const { id } = useParams();
    // Local state for order data, loading status, and error message
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id)
            return; // Exit early if no ID provided
        const fetchOrder = async () => {
            try {
                // Fetch order details by ID from the service
                const fetchedOrder = await getOrderById(id);
                if (!fetchedOrder) {
                    setError("Order not found.");
                    return;
                }
                // Normalize createdAt to a Date object if needed
                setOrder({
                    ...fetchedOrder,
                    createdAt: 
                    // If createdAt is a Firestore Timestamp, convert it to a JS Date
                    "toDate" in fetchedOrder.createdAt
                        ? fetchedOrder.createdAt.toDate()
                        : new Date(fetchedOrder.createdAt),
                });
            }
            catch (error) {
                console.error("Failed to fetch order:", error);
                setError("Failed to fetch order.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);
    // Show loading message while fetching data
    if (loading)
        return _jsx("p", { children: "Loading order details..." });
    // Show error message if fetch failed
    if (error)
        return _jsx("p", { className: "text-red-500", children: error });
    // Show fallback if no order found after loading
    if (!order)
        return _jsx("p", { children: "Order not found." });
    return (_jsxs("div", { className: "p-4", children: [_jsx("button", { className: "mb-4 px-4 py-2 bg-blue-600 text-white rounded", onClick: () => navigate(-1), children: "Back to Orders" }), _jsx("h2", { className: "text-xl font-bold mb-4", children: "Order Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Order ID:" }), " ", order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), " $", order.total.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", order.createdAt.toLocaleString()] }), _jsx("h3", { className: "mt-4 mb-2 font-semibold", children: "Items:" }), _jsx("ul", { children: order.items.map((item) => (_jsxs("li", { className: "border p-2 mb-2 rounded", children: [_jsx("p", { children: _jsx("strong", { children: item.name }) }), _jsxs("p", { children: ["Quantity: ", item.quantity] }), _jsxs("p", { children: ["Price: $", item.price.toFixed(2)] })] }, item.id))) })] }));
};
export default OrderDetails;
