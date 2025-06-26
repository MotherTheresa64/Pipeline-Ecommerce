import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { Product } from "../../types";

// Reference to the "products" collection in Firestore
const productsCollection = collection(db, "products");

/**
 * Fetches all products from Firestore "products" collection.
 * Maps each document snapshot to a Product object including its id.
 * 
 * @returns Promise resolving to an array of Product objects.
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,           // Firestore document ID used as product ID
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    } as Product;
  });
};

/**
 * Adds a new product document to Firestore.
 * 
 * @param product Product data without the id (Firestore will generate it).
 */
export const addProduct = async (product: Omit<Product, "id">): Promise<void> => {
  await addDoc(productsCollection, product);
};

/**
 * Updates an existing product document in Firestore.
 * 
 * @param id Document ID of the product to update.
 * @param data Partial product data to update (excluding id).
 */
export const updateProduct = async (
  id: string,
  data: Partial<Omit<Product, "id">>
): Promise<void> => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, data);
};

/**
 * Deletes a product document from Firestore.
 * 
 * @param id Document ID of the product to delete.
 */
export const deleteProduct = async (id: string): Promise<void> => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};
