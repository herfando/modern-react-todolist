import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import semua komponen halaman yang ada di struktur folder Anda
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
        return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white text-xl">Loading...</div>;
    }

    if (isAuthenticated) {
        return element;
    }

    return <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> 

            {/* Rute utama untuk halaman Today yang terproteksi. */}
            <Route 
                path="/" 
                element={<ProtectedRoute element={<Today />} />} 
            />

            {/* Rute untuk halaman Upcoming yang terproteksi. */}
            <Route 
                path="/upcoming" 
                element={<ProtectedRoute element={<Upcoming />} />} 
            />

            {/* Rute untuk halaman Completed yang terproteksi. */}
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