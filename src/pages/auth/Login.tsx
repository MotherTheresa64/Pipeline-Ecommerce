import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = () => {
  // Local state for form inputs and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract product ID from location state (if user was redirected here from a product page)
  const fromProductId = (location.state as { fromProductId?: string })?.fromProductId;

  // Form submit handler to authenticate user with Firebase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Sign in with Firebase using email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect either back to the product page or homepage
      if (fromProductId) {
        navigate(`/products/${fromProductId}`);
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      // Handle and display error messages
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl mb-4">Login</h2>

      {/* Show error message if login fails */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />

      {/* Submit button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>

      {/* Link to registration page */}
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default Login;
