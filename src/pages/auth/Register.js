import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const Register = () => {
    // Local state for form inputs and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // Extract product ID from location state for redirect after registration
    const fromProductId = location.state?.fromProductId;
    // Form submit handler to create a new user with Firebase Auth
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Create user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            // Redirect to the product page or home page after successful registration
            if (fromProductId) {
                navigate(`/products/${fromProductId}`);
            }
            else {
                navigate("/");
            }
        }
        catch (error) {
            // Handle and display error messages
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("An unknown error occurred");
            }
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto mt-10 p-4 border rounded", children: [_jsx("h2", { className: "text-2xl mb-4", children: "Register" }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "border p-2 w-full mb-4" }), _jsx("input", { type: "password", placeholder: "Password (min 6 chars)", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "border p-2 w-full mb-4" }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-4 py-2 rounded w-full", children: "Register" })] }));
};
export default Register;
