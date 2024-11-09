'use client'
import { useState, useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';

export default function page() {
    const [profileData, setProfileData] = useState({});
    const { update, loading, error } = useContext(AuthContext);

    const handleUpdate = async (e) => {
        e.preventDefault();
        update(profileData);
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Update Profile</h2>
            <input type="text" placeholder="New Username" className="border px-2 py-1 mr-3" onChange={(e) => setProfileData({ ...profileData, [e.target.name]: e.target.value })} />
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded mt-2">Update Profile</button>
        </div>
    );
}
