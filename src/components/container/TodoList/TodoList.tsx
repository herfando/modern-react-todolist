// src/components/container/TodoList/TodoList.tsx (FULL CODE - Perbaikan Akhir)

import React from 'react';
import { useTodos } from '../../../hooks/useTodos';
import { TodoItem } from '../TodoItem/TodoItem';
// Hapus import type { Todo } dari sini, karena tidak digunakan langsung di body komponen.

// Placeholder Loader (Ganti dengan komponen UI/loader Anda)
const Loader = () => <div className="text-center py-10 text-blue-500 font-semibold">Memuat daftar tugas...</div>; 

export const TodoList: React.FC = () => {
  const { 
    todos, 
    isLoading, 
    error, 
    updateTodoStatus, 
    deleteTodo,
    isUpdating, 
  } = useTodos();

  const handleUpdateStatus = (id: string, newStatus: boolean) => {
    updateTodoStatus({ id, newStatus });
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };
  
  // Conditional Rendering: Loading State
  if (isLoading) {
    return <Loader />; 
  }

  // Conditional Rendering: Error State
  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        ❌ **Kesalahan:** Gagal memuat daftar. Pesan: {(error as Error).message}
      </div>
    );
  }
  
  // Conditional Rendering: Empty State
  if (todos.length === 0) {
    return (
      <div className="text-center py-20 border border-gray-700 p-8 rounded-lg bg-gray-900">
        <h3 className="text-xl text-white font-semibold mb-2">🎉 Tidak ada tugas.</h3>
        <p className="text-gray-400">Tambahkan tugas baru untuk memulai!</p>
      </div>
    );
  }

  // Tampilkan daftar ToDo
  return (
    <div className="space-y-4" style={{ opacity: isUpdating ? 0.6 : 1 }}>
      <h2 className="text-2xl font-bold text-white mb-4">Tugas ({todos.length} item)</h2>
      
      {/* Mapping dan Props Handling */}
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onUpdateStatus={handleUpdateStatus} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
};