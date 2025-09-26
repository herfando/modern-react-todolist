// src/providers/AppProvider.tsx (PERUBAHAN UNTUK AUTH)

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    // Membungkus semua provider di satu tempat (Clean Architecture)
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Tambahkan AuthProvider di sini */}
        <AuthProvider> 
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;