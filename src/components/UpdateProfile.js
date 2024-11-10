'use client';
import { useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';

export default function UpdateProfile({ onClose }) {
    const [profileData, setProfileData] = useState({});
    const { update, loading, error } = useContext(AuthContext);

    const handleUpdate = async (e) => {
        await update(profileData);
        onClose();
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Update Profile</h2>
            <input
                type="text"
                name="username"
                placeholder="New Username"
                className="border px-2 py-1 w-full"
                onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })}
            />
            <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
                disabled={loading}
            >
                {loading ? "Updating..." : "Update Profile"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                onClick={onClose}
                className="mt-2 text-gray-500 underline ml-3"
            >
                Cancel
            </button>
        </div>
    );
}
