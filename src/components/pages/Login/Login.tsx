import React, { useState } from "react";
// Pastikan path ke provider Anda sudah benar
import { useAuth } from '../../../providers/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../providers/ThemeProvider';

// --- Komponen SVG Icon untuk Toggle Password (Menggantikan Library Icon) ---
// Ikon Mata (Eye) dari Lucide Icons (dikonversi ke Inline SVG)
const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// Ikon Mata Tertutup (EyeOff) dari Lucide Icons (dikonversi ke Inline SVG)
const EyeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9.88 9.88c.18.18.3.4.37.62a3 3 0 0 1 0 2.92c-.07.22-.19.44-.37.62" />
        <path d="M15 12c.16-.16.32-.3.46-.46" />
        <path d="M3 3 21 21" />
        <path d="M10.5 12c-.52-.38-1.55-1-1.55-1s3-7 10-7c.72 0 1.42.06 2.1.18" />
        <path d="M12.45 15.65C13.68 16.92 17 19 21 19c.72 0 1.42-.06 2.1-.18" />
        <path d="M10 12c0-.52-.16-1.04-.45-1.45" />
    </svg>
);
// --------------------------------------------------------------------------

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    // State baru untuk show/hide password
    const [showPassword, setShowPassword] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsPending(true);
        
        try {
            // Asumsi fungsi login() sudah terhubung ke API Anda
            await login({ email, password });
            navigate("/", { replace: true });
            
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Login gagal. Cek kredensial Anda atau koneksi.");
        } finally {
            setIsPending(false);
        }
    };

    // --- Penyesuaian Kelas Tailwind untuk Dark Mode (Mengikuti Figma) ---

    // Dark Mode: Overall BG, Card BG, Text, Link, Button
    const bgColorDark = "bg-[#0B0B0D]"; // Deep Dark Gray (Lebih gelap dari gray-950)
    const cardBgDark = "bg-black/60 backdrop-blur-sm border-gray-800 shadow-2xl shadow-black/50";
    const linkDark = "text-blue-400 hover:text-blue-300"; // Warna link biru yang cocok di dark mode
    const textLight = "text-white";

    // Light Mode: Overall BG, Card BG, Text, Link, Button
    const bgColorLight = "bg-white"; // Clean White
    const cardBgLight = "bg-white border-gray-200 shadow-xl";
    const linkLight = "text-blue-600 hover:text-blue-700";
    const textDark = "text-gray-900";
    
    // Combined Classes
    const containerClasses = isDarkMode 
        ? `${bgColorDark} ${textLight}` 
        : `${bgColorLight} ${textDark}`;

    const cardClasses = isDarkMode 
        ? cardBgDark 
        : cardBgLight;

    const inputClasses = isDarkMode 
        ? "bg-gray-900 text-white placeholder-gray-500 border-gray-700 focus:border-blue-500 focus:ring-blue-500/50" 
        : "bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-300 focus:border-blue-500 focus:ring-blue-500/50";
    
    const generalLinkClasses = isDarkMode
        ? linkDark
        : linkLight;

    const buttonClasses = isDarkMode
        ? "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-semibold shadow-lg shadow-blue-500/50"
        : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold shadow-md shadow-blue-300/50";

    const labelClasses = isDarkMode ? "text-gray-300" : "text-gray-700";
    const subtitleClasses = isDarkMode ? "text-gray-400" : "text-gray-500";
    // --------------------------------------------------------------------------
    
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-500 ${containerClasses}`}>
            
            {/* Header dengan tombol toggle */}
            <header className="flex items-center justify-end px-4 sm:px-6 py-4 fixed top-0 w-full z-10">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-current"
                    aria-label="Toggle theme"
                >
                    {isDarkMode 
                        ? <span role="img" aria-label="Sun">🌞</span> 
                        : <span role="img" aria-label="Moon">🌙</span>
                    }
                </button>
            </header>

            {/* Main Content dengan Layout Centered dan Responsif Padding */}
            {/* Menggunakan p-4 di mobile, p-16/p-24 di desktop untuk 'gap' yang lebih lebar di kiri kanan */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
                {/* Card Kontainer: Lebar maks sm:max-w-sm untuk mobile, md:max-w-lg untuk desktop */}
                <div className={`w-full max-w-sm md:max-w-lg p-6 sm:p-10 rounded-xl transition-colors duration-500 ${cardClasses}`}>
                    
                    <h1 className="text-3xl font-bold mb-2">Login</h1>
                    <p className={`text-sm ${subtitleClasses} mb-8`}>
                        Welcome back! Stay on top of your tasks and goals.
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email */}
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${labelClasses}`}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors duration-300 ${inputClasses}`}
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Input Password dengan Toggle */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className={`block text-sm font-medium ${labelClasses}`}>Password</label>
                                <a href="#" className={`text-xs font-medium ${generalLinkClasses}`}>Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className={`w-full p-3 rounded-lg border focus:ring-2 transition-colors duration-300 ${inputClasses} pr-10`}
                                    required
                                    disabled={isPending}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-300 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={isPending}
                                >
                                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        
                        {/* Error Message */}
                        {error && <p className="text-red-500 text-center text-sm pt-2">{error}</p>}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className={`w-full text-white py-3 rounded-lg transition-all duration-300 transform active:scale-[0.98] ${buttonClasses}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    
                    {/* Register Link */}
                    <p className={`text-center ${subtitleClasses} mt-6 text-sm`}>
                        Don't have an account? <Link to="/register" className={`font-semibold ${generalLinkClasses}`}>Register here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Login;
