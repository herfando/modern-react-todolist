// src/types/todo.ts

// Kriteria Code Clarity & Type Safety
export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  
  // Tambahan berdasarkan desain Figma:
  date: string; // Tanggal batas waktu (e.g., "2025-08-05")
  priority: 'Low' | 'Medium' | 'High'; // Prioritas tugas
}

// Payload untuk membuat Todo baru (tidak perlu id, isCompleted, atau createdAt)
export type CreateTodoPayload = Omit<Todo, 'id' | 'isCompleted' | 'createdAt'>;

// Payload untuk mengupdate Todo (hanya status yang diupdate di TodoItem)
export type UpdateTodoPayload = Pick<Todo, 'isCompleted'>;


// Kriteria Props Handling (Sudah bagus, kita biarkan saja)
export interface TodoItemProps {
  todo: Todo;
  onUpdateStatus: (id: string, newStatus: boolean) => void;
  onDelete: (id: string) => void;
}