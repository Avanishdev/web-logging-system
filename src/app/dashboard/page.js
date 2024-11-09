'use client';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LogTable from '../../components/LogTable';
import SearchFilter from '../../components/SearchFilter';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { Spinner } from '../../components/Spinner';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
    const { user, logout } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({ actionType: "", startDate: "", endDate: "" });
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLogs = async () => {
        const token = localStorage.getItem("token");
        const query = new URLSearchParams({
            actionType: filters.actionType,
            startDate: filters.startDate,
            endDate: filters.endDate,
            page,
            limit
        }).toString();

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logs?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const filteredLogs = response.data?.filter(log => log.isDeleted === false);
            setLogs(filteredLogs);
        } catch (error) {
            setError("Failed to load logs. Please try again.");
            console.error("Error getting logs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [filters, page]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1); // Reset page
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        redirect('/profile/update')
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className="p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
                    Web Logging System
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">{user?.username}</span>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-full max-w-5xl mb-6">
                    <SearchFilter onFilterChange={handleFilterChange} />
                </div>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                ) : logs.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">No logs found</div>
                ) : (
                    <LogTable logs={logs} fetchLogs={fetchLogs} />
                )}

                <Pagination page={page} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
