import type { Timestamp } from "firebase/firestore";

/**
 * Product type represents an item available in the store.
 */
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

/**
 * CartItem extends Product with a quantity property to represent
 * how many of this product are in the user's cart.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * OrderItem represents a product within an order,
 * including the quantity purchased and product details.
 */
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

/**
 * Order type contains order metadata including:
 * - optional id (Firestore document id)
 * - userId who placed the order
 * - array of items purchased
 * - timestamp of creation (can be Firestore Timestamp or JS Date)
 * - total price of the order
 */
export type Order = {
  id?: string;
  userId: string;
  items: OrderItem[];
  createdAt: Date | Timestamp;
  total: number;
};

/**
 * UserProfile interface represents the user data stored in Firestore,
 * including optional fields and a createdAt timestamp.
 */
export interface UserProfile {
  email: string;
  name?: string;
  address?: string;
  createdAt?: Date | Timestamp;
}
