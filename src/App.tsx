// src/App.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 1. Impor semua komponen halaman dari folder pages
import Today from './components/pages/Today'; 
import Upcoming from './components/pages/Upcoming'; 
import Completed from './components/pages/Completed';
import LoginPage from './components/pages/Login';
import RegisterPage from './components/pages/Register'; 
import { useAuth } from './providers/AuthContext.tsx';
import { AuthProvider } from './providers/AuthContext.tsx';
// 2. Impor Provider yang baru
import { TaskProvider } from './providers/TaskContext.tsx';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

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
        // 3. Bungkus Routes dengan semua Provider
        // Urutan: AuthProvider -> ThemeProvider -> TaskProvider
        <AuthProvider>
            <ThemeProvider>
                <TaskProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        
                        <Route 
                            path="/" 
                            element={<ProtectedRoute element={<Today />} />} 
                        />
                        <Route 
                            path="/upcoming" 
                            element={<ProtectedRoute element={<Upcoming />} />} 
                        />
                        <Route 
                            path="/completed" 
                            element={<ProtectedRoute element={<Completed />} />} 
                        />
                        
                        <Route path="*" element={<div className="text-center p-20 text-red-500 bg-gray-950 min-h-screen">404 NOT FOUND</div>} />
                    </Routes>
                </TaskProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;