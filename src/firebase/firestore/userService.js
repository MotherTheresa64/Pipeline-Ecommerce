import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser as firebaseDeleteUser } from "firebase/auth";
import { db } from "../firebase"; // Firestore config import
/**
 * Creates or overwrites a user document in Firestore under "users" collection.
 * @param userId - Firebase Auth user ID (UID)
 * @param userData - User profile data to store
 */
export async function createUserDocument(userId, userData) {
    await setDoc(doc(db, "users", userId), userData);
}
/**
 * Retrieves user profile data from Firestore.
 * Returns null if no user document found.
 * @param userId - Firebase Auth user ID
 * @returns UserData or null
 */
export async function getUserData(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data() : null;
}
/**
 * Updates user profile data in Firestore.
 * Filters out empty or undefined fields to avoid Firestore errors.
 * Uses merge option to update only provided fields without overwriting entire doc.
 * @param userId - Firebase Auth user ID
 * @param updatedData - Partial user data fields to update
 */
export async function updateUserProfile(userId, updatedData) {
    // Clean out empty fields to avoid Firestore errors
    const cleanData = Object.fromEntries(Object.entries(updatedData).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, v]) => v !== undefined && v !== null && v !== ""));
    if (Object.keys(cleanData).length === 0) {
        console.warn("No valid fields to update in updateUserProfile");
        return;
    }
    await setDoc(doc(db, "users", userId), cleanData, { merge: true });
}
/**
 * Deletes user profile document from Firestore and deletes Firebase Auth user.
 * Only deletes Firebase Auth user if currently logged in user exists.
 * @param userId - Firebase Auth user ID
 */
export async function deleteUserAccount(userId) {
    // Delete Firestore user document
    await deleteDoc(doc(db, "users", userId));
    // Delete currently authenticated Firebase user account
    const auth = getAuth();
    const user = auth.currentUser;
    if (user)
        await firebaseDeleteUser(user);
}
