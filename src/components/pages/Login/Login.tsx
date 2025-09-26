// src/components/pages/Login/Login.tsx (FULL CODE - FINAL DENGAN LOGIKA)

import React, { useState } from "react";
import { useAuth } from '../../../providers/AuthContext'; // Import useAuth dari provider
import { Link, useNavigate } from 'react-router-dom'; 

// Nama komponen Login
const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    
    // Ambil fungsi login dari AuthContext (GANTI loginUser yang error)
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error
        setIsPending(true); // Mulai loading
        
        try {
            // Panggil fungsi login dari AuthContext
            await login({ email, password });
            
            // Redirect ke halaman utama
            navigate("/", { replace: true });
            
        } catch (err: any) {
            console.error(err);
            // Tampilkan pesan error
            setError(err.response?.data?.message || "Login gagal. Cek kredensial Anda atau koneksi.");
        } finally {
            setIsPending(false); // Selesai loading
        }
    };

    return (
        // Gunakan Dark Mode styling
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <div className="max-w-md w-full p-8 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
                <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
                
                <form onSubmit={submit} className="space-y-4">
                    
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-600/50"
                        required
                        disabled={isPending}
                    />
                    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-600 focus:ring focus:ring-blue-600/50"
                        required
                        disabled={isPending}
                    />
                    
                    {error && <p className="text-red-400 text-center">{error}</p>}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600"
                        disabled={isPending}
                    >
                        {isPending ? 'Loading...' : 'Submit'}
                    </button>
                    
                </form>
                
                <p className="text-center text-gray-400 mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;