import axios from 'axios';
import React from 'react'

const DeleteLogButton = ({ id, fetchLogs }) => {
    const handleDeleteLog = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/logs/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            fetchLogs();
        }).catch(error => console.error("Error soft deleting log:", error));
    };

    return (
        <button onClick={() => { handleDeleteLog(id) }} className="text-red-500 underline ml-3">Delete Log</button>
    )
}

export default DeleteLogButton