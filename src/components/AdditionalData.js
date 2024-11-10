'use client'
import { useState, useContext } from "react";
import axios from "axios";
import DeleteLogButton from "./DeleteLogButton";
import { AuthContext } from "@/context/AuthContext";

export default function AdditionalData({ onClose, selectedLog, fetchLogs }) {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState({ key: "", value: "" });
    const id = selectedLog?._id;

    const handleAddData = () => {
        const payload = { additionalData: data };
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logs/additional/add/${id}`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(response => {
            alert("Data added successfully");
            onClose();
        }).catch(error => console.error("Add data error:", error));
    };

    const handleDeleteData = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logs/additional/delete/${id}/${data.key}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(response => {
            alert("Data deleted successfully");
        }).catch(error => console.error("Delete data error:", error));
    };

    return (
        <div className="p-4 bg-white rounded shadow-md mb-4" >
            <h2 className="text-lg font-bold mb-2">Manage Additional Data</h2>
            <input type="text" placeholder="Key" onChange={(e) => setData({ ...data, key: e.target.value })} className="border p-2 mb-2 w-full" />
            <input type="text" placeholder="Value" onChange={(e) => setData({ ...data, value: e.target.value })} className="border p-2 mb-2 w-full" />
            <div>
                <button onClick={handleAddData} className="px-4 py-2 bg-green-500 text-white rounded mt-2">Add Data</button>
                <button onClick={handleDeleteData} className="px-4 py-2 bg-red-500 text-white rounded mt-2 ml-3">Delete Data</button>
                {user?.role === 'admin' && <DeleteLogButton id={id} fetchLogs={fetchLogs} />}
            </div>
        </div>
    );
}
