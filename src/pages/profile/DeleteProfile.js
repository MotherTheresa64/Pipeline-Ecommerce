import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { deleteUserAccount } from "../../firebase/firestore/userService"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
const DeleteProfile = () => {
    // Get current user and logout function from auth context
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    // Local loading and error state for async operation feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Handler to delete user account
    const handleDelete = async () => {
        if (!user)
            return; // Safety check: no user to delete
        setLoading(true);
        setError(null);
        try {
            // Delete user document from Firestore and Auth user
            await deleteUserAccount(user.uid);
            // Log user out after deletion
            await logout();
            // Redirect to home or login page
            navigate("/");
        }
        catch {
            setError("Failed to delete account. Try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-red-600", children: "Delete Account" }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsx("p", { children: "Are you sure you want to delete your account? This action cannot be undone." }), _jsx("button", { onClick: handleDelete, disabled: loading, className: "mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50", children: loading ? "Deleting..." : "Delete My Account" })] }));
};
export default DeleteProfile;
