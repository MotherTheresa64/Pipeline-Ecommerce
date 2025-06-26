import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getUserData, updateUserProfile, deleteUserAccount } from "../../firebase/firestore/userService";
import type { UserData } from "../../firebase/firestore/UserData";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  // State to hold the user profile data fetched from Firestore
  const [profile, setProfile] = useState<UserData | null>(null);

  // Loading indicator while fetching data
  const [loading, setLoading] = useState(true);

  // Toggles edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Form state for editable fields (excluding email)
  const [formData, setFormData] = useState<Omit<UserData, "email">>({
    name: "",
    address: "",
    phone: "",
  });

  // Loading state while saving or deleting profile
  const [saving, setSaving] = useState(false);

  // Error message to display failures
  const [error, setError] = useState<string | null>(null);

  // Success message to display on successful save
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user profile on mount or user change
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const data = await getUserData(user.uid);
        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || "",
            address: data.address || "",
            phone: data.phone || "",
          });
        }
      } catch {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // Show message if no authenticated user
  if (!user) return <p>Please log in to view your profile.</p>;

  // Show loading indicator while fetching profile
  if (loading) return <p>Loading profile...</p>;

  // Handle input changes for the edit form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save edited profile data to Firestore
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUserProfile(user.uid, formData);
      setProfile({ ...profile!, ...formData }); // Update local profile state
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      setError("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing and reset form data to last saved profile
  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      address: profile?.address || "",
      phone: profile?.phone || "",
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  // Delete user account from Firestore and Firebase Auth
  const handleDelete = async () => {
    if (!user) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirm) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteUserAccount(user.uid);
      await logout();
      navigate("/");
    } catch {
      setError("Failed to delete account.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {/* Display error and success messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {!isEditing ? (
        <>
          {/* Display user profile data */}
          <p><strong>Email:</strong> {profile?.email || user.email}</p>
          <p><strong>Name:</strong> {profile?.name || "-"}</p>
          <p><strong>Address:</strong> {profile?.address || "-"}</p>
          <p><strong>Phone:</strong> {profile?.phone || "-"}</p>

          {/* Edit and Delete buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={saving}
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              disabled={saving}
            >
              Delete Profile
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Editable form fields */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={saving}
            />
          </label>

          <label className="block mb-2">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={saving}
            />
          </label>

          <label className="block mb-4">
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              disabled={saving}
            />
          </label>

          {/* Save and Cancel buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
