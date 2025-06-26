import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Register = () => {
  // Local state for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract product ID from location state for redirect after registration
  const fromProductId = (location.state as { fromProductId?: string })?.fromProductId;

  // Form submit handler to create a new user with Firebase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Redirect to the product page or home page after successful registration
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
      <h2 className="text-2xl mb-4">Register</h2>

      {/* Display error message if registration fails */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full mb-4"
      />

      {/* Password input field with minimum length validation */}
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="border p-2 w-full mb-4"
      />

      {/* Submit button */}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  );
};

export default Register;
