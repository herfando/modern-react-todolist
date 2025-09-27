// src/components/pages/Login/Login.tsx
import React, { useState } from "react";
import { useAuth } from '../../../providers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeProvider'; // Import hook useTheme

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme(); // Gunakan hook useTheme

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsPending(true);
        
        try {
            await login({ email, password });
            navigate("/", { replace: true });
            
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Login gagal. Cek kredensial Anda atau koneksi.");
        } finally {
            setIsPending(false);
        }
    };

    const containerClasses = isDarkMode 
        ? "bg-gray-950 text-white" 
        : "bg-gray-100 text-gray-900";

    const cardClasses = isDarkMode 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-200";

    const inputClasses = isDarkMode 
        ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-blue-500" 
        : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300 focus:border-blue-500";
    
    const forgotPasswordLinkClasses = isDarkMode
        ? "text-blue-500 hover:text-blue-400"
        : "text-blue-600 hover:text-blue-500";

    const buttonClasses = isDarkMode
        ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700"
        : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400";
    
    return (
        <div className={`flex flex-col min-h-screen ${containerClasses}`}>
            
            {/* Header dengan tombol toggle */}
            <header className="flex items-center justify-end px-6 py-4 fixed top-0 w-full z-10">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? '🌞' : '🌙'}
                </button>
            </header>

            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className={`w-full max-w-sm p-8 rounded-lg shadow-xl border ${cardClasses} sm:max-w-md lg:max-w-lg`}>
                    <h1 className="text-2xl font-bold mb-1">Login</h1>
                    <p className="text-sm text-gray-500 mb-6">Welcome back! Sign in to your to-do list account.</p>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500/50 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium">Password</label>
                                <a href="#" className={`text-xs ${forgotPasswordLinkClasses}`}>Forgot Password?</a>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500/50 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                        <button 
                            type="submit" 
                            className={`w-full text-white font-semibold py-3 rounded-lg transition-colors duration-300 ${buttonClasses}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    
                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Don't have an account? <Link to="/register" className={`font-semibold ${forgotPasswordLinkClasses}`}>Register here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;