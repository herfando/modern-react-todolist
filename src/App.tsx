import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import halaman dan provider
import Home from './components/pages/home';
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

            {/* Rute utama yang terproteksi (halaman To-Do) */}
            <Route 
                path="/" 
                element={<ProtectedRoute element={<Home />} />} 
            />
            
            {/* Halaman 404 jika rute tidak ditemukan */}
            <Route path="*" element={<div className="text-center p-20 text-red-500 bg-gray-950 min-h-screen">404 NOT FOUND</div>} />
        </Routes>
    );
};

export default App;