import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";

// Define the shape of the auth context value
interface AuthContextType {
  user: User | null; // Currently logged-in Firebase user or null if none
  login: (email: string, password: string) => Promise<void>; // Function to log in user
  logout: () => Promise<void>; // Function to log out user
}

// Create the authentication context with undefined as default to enforce usage within provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component wraps the app and provides authentication state & functions
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Local state to store the currently authenticated user
  const [user, setUser] = useState<User | null>(null);

  // Listen for Firebase auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to log in user using Firebase email/password authentication
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user
  const logout = async () => {
    await signOut(auth);
  };

  // Provide user and auth functions to descendant components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext in components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // Enforce that this hook is used inside the AuthProvider component
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
