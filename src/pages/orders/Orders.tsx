// src/features/orders/Orders.tsx
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getOrdersByUser } from "./orderService";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types";
import { Timestamp } from "firebase/firestore"; // Import Timestamp for type checking

const Orders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUser(user.uid);

        // Convert Firestore Timestamps to JS Date objects for createdAt
        const sanitizedOrders = fetchedOrders.map((order) => ({
          ...order,
          id: order.id ?? "",
          createdAt:
            order.createdAt instanceof Timestamp
              ? order.createdAt.toDate()
              : new Date(order.createdAt),
        }));

        setOrders(sanitizedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className="border p-4 mb-3 rounded cursor-pointer hover:bg-gray-700"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <p>
              <strong>Date:</strong> {order.createdAt.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
