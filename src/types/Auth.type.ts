// src/types/Auth.type.ts (FULL CODE)

export interface User {
  id: string;
  name: string;
  email: string;
  token: string; // Token yang diterima setelah login
}

// Payload untuk Login dan Register (sesuai desain Figma image_41ed4a.png)
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string; // Tidak dikirim ke API, hanya untuk validasi
}

// Response setelah Login/Register
export type AuthResponse = Omit<User, 'token'> & { token: string }; 
// Omit digunakan untuk memastikan User memiliki token