'use client'
import { AuthContext } from '@/context/AuthContext';
import axios from 'axios';
import React, { useState, useContext } from 'react';

const CreateLogButton = ({ fetchLogs }) => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [actionType, setActionType] = useState('');
    const [additionalData, setAdditionalData] = useState([{ key: '', value: '' }]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setActionType('');
        setAdditionalData([{ key: '', value: '' }]);
    };

    const handleAdditionalDataChange = (index, field, value) => {
        const updatedData = [...additionalData];
        updatedData[index][field] = value;
        setAdditionalData(updatedData);
    };

    const addAdditionalDataField = () => {
        setAdditionalData([...additionalData, { key: '', value: '' }]);
    };

    const handleCreateLog = () => {
        const additionalDataObject = additionalData.reduce((acc, item) => {
            if (item.key) acc[item.key] = item.value;
            return acc;
        }, {});

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logs`, {
            actionType,
            additionalData: additionalDataObject,
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
            fetchLogs();
            closeModal();
        }).catch(error => console.error("Error creating log:", error));
    };

    return (
        <div>
            {user?.role === 'admin' && <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded mb-2">Create Log</button>}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}>
                    <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">Create New Log</h2>

                        <label className="block mb-2 text-gray-700">Action Type:</label>
                        <input
                            type="text"
                            value={actionType}
                            onChange={(e) => setActionType(e.target.value)}
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            placeholder="Enter Action Type"
                        />

                        <label className="block mb-2 text-gray-700">Additional Data:</label>
                        {additionalData.map((data, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={data.key}
                                    onChange={(e) => handleAdditionalDataChange(index, 'key', e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded"
                                    placeholder="Key"
                                />
                                <input
                                    type="text"
                                    value={data.value}
                                    onChange={(e) => handleAdditionalDataChange(index, 'value', e.target.value)}
                                    className="w-1/2 p-2 border border-gray-300 rounded"
                                    placeholder="Value"
                                />
                            </div>
                        ))}
                        <button
                            onClick={addAdditionalDataField}
                            className="text-blue-500 text-sm mb-4"
                        >
                            + Add Field
                        </button>

                        <div className="flex justify-end">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                            <button onClick={handleCreateLog} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateLogButton;
