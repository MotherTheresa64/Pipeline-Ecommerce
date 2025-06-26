import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/features/orders/Orders.tsx
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getOrdersByUser } from "./orderService";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore"; // Import Timestamp for type checking
const Orders = () => {
    const { user } = useAuthContext();
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user)
            return;
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrdersByUser(user.uid);
                // Convert Firestore Timestamps to JS Date objects for createdAt
                const sanitizedOrders = fetchedOrders.map((order) => ({
                    ...order,
                    id: order.id ?? "",
                    createdAt: order.createdAt instanceof Timestamp
                        ? order.createdAt.toDate()
                        : new Date(order.createdAt),
                }));
                setOrders(sanitizedOrders);
            }
            catch (error) {
                console.error("Failed to fetch orders:", error);
                setError("Failed to fetch orders.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user]);
    if (loading)
        return _jsx("p", { children: "Loading orders..." });
    if (error)
        return _jsx("p", { className: "text-red-500", children: error });
    if (!orders || orders.length === 0)
        return _jsx("p", { children: "No orders found." });
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Your Orders" }), _jsx("ul", { children: orders.map((order) => (_jsxs("li", { className: "border p-4 mb-3 rounded cursor-pointer hover:bg-gray-700", onClick: () => navigate(`/orders/${order.id}`), children: [_jsxs("p", { children: [_jsx("strong", { children: "Order ID:" }), " ", order.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Total:" }), " $", order.total.toFixed(2)] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", order.createdAt.toLocaleString()] })] }, order.id))) })] }));
};
export default Orders;
