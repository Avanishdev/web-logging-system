'use client';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function SignupPage() {
    const { register, loading, error } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setConfirmError("Passwords do not match");
            return;
        }
        setConfirmError('');
        register(username, password, role);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-pink-700 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="role"
                            placeholder="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-200 ease-in-out"
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-all duration-200 ease-in-out"
                        />
                        {confirmError && <p className="text-red-500 text-sm">{confirmError}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center px-4 py-2 text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-all duration-200 ease-in-out"
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
                        ) : "Sign Up"}
                    </button>
                </form>

                {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account? <a href="/login" className="text-pink-600 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
}
