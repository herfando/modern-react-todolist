// src/providers/AuthContext.tsx (FULL CODE - PERBAIKAN IMPORT)

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import type { User, LoginPayload, RegisterPayload } from '../types/Auth.type';
// Perbaikan: Ganti Named Import menjadi Default Import
import client from '../api/client'; 

// --- Tipe Context ---
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Nilai default context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider Component ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efek untuk memuat user dari localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        // Set token ke instance axios global
        client.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
      } catch (e) {
        console.error("Gagal parse user dari localStorage", e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Fungsi Login
  const login = useCallback(async (payload: LoginPayload) => {
    const authData = await authService.login(payload);
    const fullUser: User = { ...authData, token: authData.token }; // Pastikan token ada di User
    
    setUser(fullUser);
    localStorage.setItem('user', JSON.stringify(fullUser));
    client.defaults.headers.common['Authorization'] = `Bearer ${fullUser.token}`;
  }, []);

  // Fungsi Register
  const register = useCallback(async (payload: RegisterPayload) => {
    const authData = await authService.register(payload);
    const fullUser: User = { ...authData, token: authData.token };
    
    setUser(fullUser);
    localStorage.setItem('user', JSON.stringify(fullUser));
    client.defaults.headers.common['Authorization'] = `Bearer ${fullUser.token}`;
  }, []);

  // Fungsi Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    delete client.defaults.headers.common['Authorization'];
  }, []);

  const isAuthenticated = !!user;

  const value = { user, isLoading, login, register, logout, isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Custom Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};