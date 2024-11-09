'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            getUserData(storedToken);
        }
    }, []);

    const register = async (username, password, role) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                username,
                password,
                role,
            });
            router.push("/login");
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error("Registration failed", err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            setLoading(true);
            setError(null);// Clear any previous errors

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { username, password });
            const { token } = response.data;

            localStorage.setItem("token", token);
            setToken(token);
            getUserData(token);
            router.push("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            setError(error.response?.data || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const update = async (profileData) => {
        try {
            setLoading(true);
            setError(null);// Clear any previous errors
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found.");

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            alert("Profile updated successfully!");
            router.push("/dashboard");
        } catch (error) {
            console.error("Profile Update failed", error);
            setError("Failed to update profile. Please try again.");
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found.");

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
            setError("Failed to log out. Please try again.");
        }
    };

    const getUserData = async (token) => {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: decoded._id, username: decoded.username, role: decoded.role });
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, update, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContext };
