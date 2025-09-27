import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'; // Icon Logout
import Loader from '../../components/common/Loader'; // PATH DIPERBAIKI
import { getFirebaseApp } from '../../utils/firebase'; // Menggunakan helper untuk mendapatkan instance Firebase

// Helper untuk mendapatkan instance Firebase App
const app = getFirebaseApp();
const auth = getAuth(app);

interface LogOutProps {
    // Fungsi untuk menavigasi (simulasi)
    onLogoutSuccess: () => void; 
    isDarkMode: boolean;
}

/**
 * Komponen Tombol Logout
 * Menangani proses sign-out dari Firebase.
 */
const LogOut: React.FC<LogOutProps> = ({ onLogoutSuccess, isDarkMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Melakukan proses sign out
            await signOut(auth);
            
            // Panggil callback untuk navigasi ke halaman login
            onLogoutSuccess(); 

        } catch (err) {
            console.error("Logout Error:", err);
            // Menampilkan pesan error yang lebih user-friendly
            setError("Gagal logout. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    // Gaya untuk Dropdown/Button Logout
    const baseClasses = `
        text-sm px-3 py-1 rounded-lg transition duration-200 flex items-center space-x-2
        ${isDarkMode 
            ? 'text-gray-300 hover:bg-gray-700 active:bg-gray-600' 
            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'}
        ${isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `;

    return (
        <div className="relative">
            {/* Tombol Logout */}
            <button 
                onClick={handleLogout} 
                disabled={isLoading}
                className={baseClasses}
            >
                {isLoading ? (
                    <Loader color={isDarkMode ? 'white' : 'blue'} className="w-4 h-4" />
                ) : (
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                )}
                <span>Logout</span>
            </button>

            {/* Menampilkan Error jika ada */}
            {error && (
                <div 
                    className={`absolute right-0 mt-2 p-2 text-xs rounded-lg shadow-lg z-10 
                    ${isDarkMode ? 'bg-red-800 text-white' : 'bg-red-100 text-red-700'}`}
                >
                    {error}
                </div>
            )}
        </div>
    );
};

export default LogOut;
