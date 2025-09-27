import React from 'react';

// --- Import Komponen UI untuk UJI COBA ---
import Button from './components/ui/button/Button';
import Input from './components/ui/input/Input';
import Loader from './components/ui/loader/Loader';
// ------------------------------------------

// Kami menghapus semua import routing (Routes, Route, dll.) 
// dan import halaman/provider yang belum dibuat (HomePage, useAuth, dll.) 
// untuk menghilangkan 12 error yang muncul.

const App: React.FC = () => {
    return (
        <div className="p-8 min-h-screen bg-gray-900 flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold text-white mb-4">UI Component Test</h1>
            
            {/* Test Button Components */}
            <div className="flex gap-4 w-full justify-center">
                <Button variant="primary">Primary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button isLoading>Loading</Button>
            </div>
            
            {/* Test Input Component */}
            <div className="w-96">
                <Input placeholder="Tulis sesuatu di sini..." />
            </div>
            
            {/* Test Loader Component */}
            <div className="p-4 bg-gray-800 rounded-lg w-fit">
                <h2 className="text-xl text-white mb-2">Loader Test</h2>
                <Loader />
            </div>
        </div>
    );
};

export default App;
