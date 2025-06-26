import { collection, query, where, getDocs, doc, getDoc, addDoc, serverTimestamp, } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Adjust import if needed
/**
 * Fetches all orders for a specific user by userId.
 * Queries Firestore "orders" collection where "userId" matches.
 *
 * @param userId - Firebase Auth user ID
 * @returns Promise resolving to an array of Order objects
 */
export const getOrdersByUser = async (userId) => {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
};
/**
 * Fetches a single order by order ID.
 *
 * @param orderId - Firestore document ID of the order
 * @returns Promise resolving to Order object or null if not found
 */
export const getOrderById = async (orderId) => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};
/**
 * Creates a new order document in Firestore.
 * Automatically sets `createdAt` timestamp server-side.
 *
 * @param orderData - Order data excluding `id` and `createdAt`
 * @returns Promise resolving to the new document ID
 */
export const createOrder = async (orderData) => {
    // Add server timestamp for creation time
    const orderWithTimestamp = {
        ...orderData,
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, "orders"), orderWithTimestamp);
    return docRef.id;
};
