import React, { useState } from "react";
// Jalur impor diperbaiki menjadi dua tingkat ke atas (../../)
import { useAuth } from '../../../providers/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeProvider'; 
// Baris import type { ReactNode } dari 'react' dihapus karena tidak digunakan.

// Fungsi bantuan untuk validasi dasar
const validatePassword = (password: string, confirmPassword: string): string | null => {
    if (password.length < 6) {
        return "Password minimal harus 6 karakter.";
    }
    if (password !== confirmPassword) {
        return "Konfirmasi password tidak cocok.";
    }
    return null;
};

const Register: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    
    // Ambil fungsi register dari AuthContext
    const { register } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validasi Password
        const passwordError = validatePassword(password, confirmPassword);
        if (passwordError) {
            return setError(passwordError);
        }

        setIsPending(true);
        
        try {
            // Panggil fungsi register dari AuthContext
            await register({ name, email, password });
            
            // Setelah registrasi berhasil, arahkan ke halaman utama
            navigate("/", { replace: true });
            
        } catch (err: any) {
            console.error(err);
            // Tangani error dari API atau server
            setError(err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.");
        } finally {
            setIsPending(false);
        }
    };

    // --- Kelas Styling Tailwind CSS (Sama dengan Login.tsx) ---
    const containerClasses = isDarkMode 
        ? "bg-gray-950 text-white" 
        : "bg-gray-100 text-gray-900";

    const cardClasses = isDarkMode 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-200";

    const inputClasses = isDarkMode 
        ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-blue-500 focus:ring-blue-500/50" 
        : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300 focus:border-blue-500 focus:ring-blue-500/50";
    
    const linkClasses = isDarkMode
        ? "text-blue-500 hover:text-blue-400"
        : "text-blue-600 hover:text-blue-500";

    const buttonClasses = isDarkMode
        ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed";
    
    return (
        <div className={`flex flex-col min-h-screen ${containerClasses}`}>
            
            {/* Header dengan tombol toggle tema */}
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
                    <h1 className="text-2xl font-bold mb-1">Register</h1>
                    <p className="text-sm text-gray-500 mb-6">Create your free account and start planning today.</p>

                    <form onSubmit={submit} className="space-y-4">
                        
                        {/* Input Nama */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Input Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create Password (min 6 characters)"
                                className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Input Konfirmasi Password */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>
                        
                        {/* Pesan Error */}
                        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                        {/* Tombol Submit */}
                        <button 
                            type="submit" 
                            className={`w-full text-white font-semibold py-3 rounded-lg transition-colors duration-300 ${buttonClasses}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                    
                    {/* Link Login */}
                    <p className="text-center text-gray-500 mt-6 text-sm">
                        Already have an account? <Link to="/login" className={`font-semibold ${linkClasses}`}>Login here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Register;
