// src/features/orders/OrderDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "./orderService";
import type { Order, OrderItem } from "../../types";

const OrderDetails = () => {
  // Get order ID from route parameters
  const { id } = useParams<{ id: string }>();

  // Local state for order data, loading status, and error message
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // Exit early if no ID provided

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
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setError("Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Show loading message while fetching data
  if (loading) return <p>Loading order details...</p>;

  // Show error message if fetch failed
  if (error) return <p className="text-red-500">{error}</p>;

  // Show fallback if no order found after loading
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="p-4">
      {/* Back button navigates to previous page */}
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back to Orders
      </button>

      {/* Order summary */}
      <h2 className="text-xl font-bold mb-4">Order Details</h2>

      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </p>
      <p>
        <strong>Date:</strong> {order.createdAt.toLocaleString()}
      </p>

      {/* List of items included in the order */}
      <h3 className="mt-4 mb-2 font-semibold">Items:</h3>
      <ul>
        {order.items.map((item: OrderItem) => (
          <li key={item.id} className="border p-2 mb-2 rounded">
            <p>
              <strong>{item.name}</strong>
            </p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
