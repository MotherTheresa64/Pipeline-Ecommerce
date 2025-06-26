import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getUserData, updateUserProfile } from "../../firebase/firestore/userService";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    // Local state for form fields
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    // Loading states
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    // Error message state
    const [error, setError] = useState(null);
    // Fetch user data on mount or when user changes
    useEffect(() => {
        const fetchUser = async () => {
            if (!user)
                return;
            setLoading(true);
            setError(null);
            try {
                const data = await getUserData(user.uid);
                if (data) {
                    setName(data.name || "");
                    setAddress(data.address || "");
                }
            }
            catch {
                setError("Failed to load user data.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [user]);
    // Handle form submit to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user)
            return;
        setSaving(true);
        setError(null);
        try {
            await updateUserProfile(user.uid, { name, address });
            navigate("/profile");
        }
        catch {
            setError("Failed to save changes.");
        }
        finally {
            setSaving(false);
        }
    };
    if (loading)
        return _jsx("p", { children: "Loading profile..." });
    if (error)
        return _jsx("p", { className: "text-red-500", children: error });
    return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Edit Profile" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [_jsx("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), className: "border px-4 py-2 rounded", disabled: saving }), _jsx("input", { type: "text", placeholder: "Address", value: address, onChange: (e) => setAddress(e.target.value), className: "border px-4 py-2 rounded", disabled: saving }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white py-2 rounded", disabled: saving, children: saving ? "Saving..." : "Save Changes" })] })] }));
};
export default EditProfile;
