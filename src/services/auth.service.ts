// src/services/auth.service.ts (FULL CODE - PERBAIKAN IMPORT)

// Perbaikan: Ganti Named Import menjadi Default Import
import client from '../api/client'; 
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/Auth.type';

// Service untuk Autentikasi
export const authService = {
  // Service untuk Login
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    // Sesuaikan endpoint API Anda
    const { data } = await client.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  // Service untuk Register
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    // Hapus confirmPassword sebelum dikirim ke API
    const { confirmPassword, ...apiPayload } = payload; 
    
    // Sesuaikan endpoint API Anda
    const { data } = await client.post<AuthResponse>('/auth/register', apiPayload);
    return data;
  },
};