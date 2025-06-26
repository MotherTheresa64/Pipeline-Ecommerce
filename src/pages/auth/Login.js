import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const Login = () => {
    // Local state for form inputs and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    // Extract product ID from location state (if user was redirected here from a product page)
    const fromProductId = location.state?.fromProductId;
    // Form submit handler to authenticate user with Firebase Auth
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Sign in with Firebase using email and password
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect either back to the product page or homepage
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
    return (_jsxs("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto mt-10 p-4 border rounded", children: [_jsx("h2", { className: "text-2xl mb-4", children: "Login" }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "border p-2 w-full mb-4" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "border p-2 w-full mb-4" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded w-full", children: "Login" }), _jsxs("p", { className: "mt-4", children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", className: "text-blue-400 underline", children: "Register here" })] })] }));
};
export default Login;
