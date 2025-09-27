// src/providers/AppProvider.tsx

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeProvider'; // Pastikan ini diimpor
import type { ReactNode } from 'react'; // Pastikan ini diimpor untuk TypeScript

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {/* ThemeProvider harus ada di sini, di dalam AuthProvider */}
          <ThemeProvider> 
            {children}
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;