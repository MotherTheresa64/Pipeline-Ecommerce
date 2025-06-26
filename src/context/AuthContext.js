import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
// Create the authentication context with undefined as default to enforce usage within provider
const AuthContext = createContext(undefined);
// AuthProvider component wraps the app and provides authentication state & functions
export const AuthProvider = ({ children }) => {
    // Local state to store the currently authenticated user
    const [user, setUser] = useState(null);
    // Listen for Firebase auth state changes (login/logout)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Function to log in user using Firebase email/password authentication
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };
    // Function to log out the current user
    const logout = async () => {
        await signOut(auth);
    };
    // Provide user and auth functions to descendant components
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
// Custom hook to easily consume the AuthContext in components
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    // Enforce that this hook is used inside the AuthProvider component
    if (!context)
        throw new Error("useAuthContext must be used within AuthProvider");
    return context;
};
