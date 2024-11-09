'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
    const { login, loading, error } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Welcome Back!</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 ease-in-out"
                    >
                        {loading ? (
                            <svg
                                className="w-5 h-5 mr-2 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
                                ></path>
                            </svg>
                        ) : "Login"}
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Need an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
}
