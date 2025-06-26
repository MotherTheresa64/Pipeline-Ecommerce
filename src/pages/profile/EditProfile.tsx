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
  const [error, setError] = useState<string | null>(null);

  // Fetch user data on mount or when user changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getUserData(user.uid);
        if (data) {
          setName(data.name || "");
          setAddress(data.address || "");
        }
      } catch {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  // Handle form submit to update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    try {
      await updateUserProfile(user.uid, { name, address });
      navigate("/profile");
    } catch {
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded"
          disabled={saving}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border px-4 py-2 rounded"
          disabled={saving}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
