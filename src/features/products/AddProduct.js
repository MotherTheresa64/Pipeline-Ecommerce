import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createProduct } from "./productSlice";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const AddProduct = () => {
    // Get current user from auth context
    const { user } = useAuthContext();
    // Only allow admin user with this email to access add product page
    const isAdmin = user?.email === "admin@example.com";
    // Redux dispatch function with correct typing
    const dispatch = useAppDispatch();
    // React Router navigate function for programmatic navigation
    const navigate = useNavigate();
    // Form state to hold input values for product fields
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
    });
    // Local error state for form validation and submission errors
    const [error, setError] = useState(null);
    // Redirect non-admin users away from this page to product list
    useEffect(() => {
        if (!isAdmin) {
            navigate("/products");
        }
    }, [isAdmin, navigate]);
    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validate that name is not empty or whitespace only
        if (!form.name.trim()) {
            setError("Name is required.");
            return;
        }
        // Validate that price is a valid number and not empty
        if (!form.price || isNaN(Number(form.price))) {
            setError("Valid price is required.");
            return;
        }
        try {
            // Dispatch async createProduct thunk with form data
            await dispatch(createProduct({
                name: form.name.trim(),
                price: Number(form.price),
                description: form.description.trim(),
                image: form.image.trim() || "https://via.placeholder.com/150", // fallback image
            })).unwrap(); // unwrap to handle errors in try/catch
            // Redirect to products page after successful creation
            navigate("/products");
        }
        catch (err) {
            setError("Failed to add product. Please try again.");
            console.error(err);
        }
    };
    // Prevent rendering the form if user is not admin
    if (!isAdmin)
        return null;
    return (_jsxs("form", { onSubmit: handleSubmit, className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Add Product" }), error && _jsx("p", { className: "text-red-500 mb-4", children: error }), _jsx("input", { type: "text", placeholder: "Name", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "number", placeholder: "Price", value: form.price, onChange: (e) => setForm({ ...form, price: e.target.value }), className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "text", placeholder: "Description", value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "text", placeholder: "Image URL", value: form.image, onChange: (e) => setForm({ ...form, image: e.target.value }), className: "block mb-4 border px-2 py-1 w-full" }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700", children: "Add" })] }));
};
export default AddProduct;
