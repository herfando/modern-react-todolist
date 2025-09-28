
export interface User {
  id: string;
  name: string;
  email: string;
  token: string; // Token yang diterima setelah login
}

// Payload untuk Login dan Register
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


// src/types/todo.ts (FULL CODE)

// Kriteria Code Clarity & Type Safety
export interface Todo {
  id: string;
  title: string;
  completed: boolean; // ✅ ganti dari isCompleted → completed
  createdAt: string;

  // Tambahan berdasarkan desain Figma:
  date: string; // Tanggal batas waktu (e.g., "2025-08-05")
  priority: 'Low' | 'Medium' | 'High'; // Prioritas tugas
}

// Payload untuk membuat Todo baru (tidak perlu id atau createdAt)
export type CreateTodoPayload = Omit<Todo, 'id' | 'createdAt'>;

// Payload untuk mengupdate Todo (hanya status yang diupdate di TodoItem)
export type UpdateTodoPayload = Pick<Todo, 'completed'>;

// Kriteria Props Handling (Sudah bagus, kita biarkan saja)
export interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (id: string, newStatus: boolean) => void;
  onDelete: (id: string) => void;
}
