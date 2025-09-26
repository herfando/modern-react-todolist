// src/api/users.ts

import client from './client'; // Menggunakan client yang sudah dibuat

// Interface untuk data User (Code Clarity)
export interface User {
    id: string;
    username: string;
    email: string;
}

// Service API layer untuk entitas User
export const userService = {
  // Contoh: Mendapatkan data user yang sedang login
  getMe: async (): Promise<User> => {
    const response = await client.get('/users/me');
    return response.data;
  },

  // Contoh: Login
  login: async (credentials: any): Promise<{ token: string, user: User }> => {
    const response = await client.post('/auth/login', credentials);
    return response.data; 
  },
};