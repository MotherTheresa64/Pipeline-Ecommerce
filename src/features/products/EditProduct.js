import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editProduct } from "./productSlice";
import { useAuthContext } from "../../context/AuthContext";
const EditProduct = () => {
    // Extract product ID from route parameters
    const { id } = useParams();
    // Get current user from auth context
    const { user } = useAuthContext();
    // Only admin user (by email) is allowed to edit products
    const isAdmin = user?.email === "admin@example.com";
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // Select the product from the Redux store matching the current ID
    const product = useAppSelector((state) => state.products.list.find((item) => item.id === id));
    // Local form state for controlled inputs
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
    });
    // Local state to track validation or submission errors
    const [error, setError] = useState(null);
    // Redirect non-admin users away from this page
    useEffect(() => {
        if (!isAdmin) {
            navigate("/products");
        }
    }, [isAdmin, navigate]);
    // Populate the form inputs when the product is loaded
    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                price: product.price.toString(),
                description: product.description || "",
                image: product.image || "",
            });
        }
    }, [product]);
    // Handle form submission to update product data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        // Validation: name is required
        if (!form.name.trim()) {
            setError("Name is required.");
            return;
        }
        // Validation: price must be a valid number
        if (!form.price || isNaN(Number(form.price))) {
            setError("Valid price is required.");
            return;
        }
        // Validation: ensure product ID exists
        if (!id) {
            setError("Invalid product ID.");
            return;
        }
        try {
            // Dispatch editProduct async thunk with updated data
            await dispatch(editProduct({
                id,
                data: {
                    name: form.name.trim(),
                    price: Number(form.price),
                    description: form.description.trim(),
                    image: form.image.trim() || "https://via.placeholder.com/150",
                },
            })).unwrap();
            // Navigate back to products list on success
            navigate("/products");
        }
        catch (err) {
            setError("Failed to update product. Please try again.");
            console.error(err);
        }
    };
    // Prevent rendering if user is not admin
    if (!isAdmin)
        return null;
    return (_jsxs("form", { onSubmit: handleSubmit, className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Edit Product" }), error && _jsx("p", { className: "text-red-500 mb-4", children: error }), _jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), placeholder: "Name", className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "number", value: form.price, onChange: (e) => setForm({ ...form, price: e.target.value }), placeholder: "Price", className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "text", value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), placeholder: "Description", className: "block mb-2 border px-2 py-1 w-full" }), _jsx("input", { type: "text", value: form.image, onChange: (e) => setForm({ ...form, image: e.target.value }), placeholder: "Image URL", className: "block mb-4 border px-2 py-1 w-full" }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700", children: "Save" })] }));
};
export default EditProduct;
