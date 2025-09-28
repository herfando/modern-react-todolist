import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Impor semua komponen halaman dari folder pages
import Today from './components/pages/Today'; 
import Upcoming from './components/pages/Upcoming'; 
import Completed from './components/pages/Completed';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register'; 
import { useAuth } from './providers/AuthContext'; 

// Komponen Pembungkus untuk Halaman yang Terproteksi
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        // Tampilan loading sementara saat memeriksa status autentikasi
        return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-xl">Loading...</div>;
    }

    if (isAuthenticated) {
        // Jika sudah login, tampilkan komponen yang diminta
        return element;
    }

    // Jika belum login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <Routes>
            {/* Rute untuk halaman autentikasi */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 

            {/* Rute-rute yang dilindungi oleh ProtectedRoute */}
            {/* Halaman utama (root) akan menampilkan komponen Today */}
            <Route 
                path="/" 
                element={<ProtectedRoute element={<Today />} />} 
            />

            {/* Halaman '/upcoming' akan menampilkan komponen Upcoming */}
            <Route 
                path="/upcoming" 
                element={<ProtectedRoute element={<Upcoming />} />} 
            />

            {/* Halaman '/completed' akan menampilkan komponen Completed */}
            <Route 
                path="/completed" 
                element={<ProtectedRoute element={<Completed />} />} 
            />
            
            {/* Halaman 404 jika rute tidak ditemukan */}
            <Route path="*" element={<div className="text-center p-20 text-red-500 bg-gray-950 min-h-screen">404 NOT FOUND</div>} />
        </Routes>
    );
};

export default App;