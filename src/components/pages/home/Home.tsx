// src/components/pages/home/Home.tsx
import React from 'react';
import { useTodos } from '../../../hooks/useTodos';
import TodoForm from '../../container/TodoForm/TodoForm';
import TodoList from '../../container/TodoList/TodoList';

const Loader: React.FC = () => (
    <div className="text-center p-10">
        <p className="text-lg text-indigo-600 font-medium">Memuat tugas...</p>
    </div>
);

const Home: React.FC = () => {
  // Ambil data dan handler dari custom hook (useTodos)
  const { todos, isLoading, isError, updateTodo } = useTodos();

  // FUNGSI WRAPPER PERBAIKAN: 
  // Menerima dua argumen dari TodoItem dan mengemasnya menjadi satu object
  // sesuai kebutuhan TanStack Query mutate function.
  const handleUpdateStatus = (id: string, newStatus: boolean) => {
      // Panggil updateTodo (mutate) dengan format object { id, isCompleted } yang benar
      updateTodo({ id: id, isCompleted: newStatus }); 
  };

  // DEBUGGING: Anda bisa melihat array data di console
  console.log("Data Todos yang diterima di Home.tsx:", todos); 

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto bg-white min-h-screen shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        Todo List Challenge 8
      </h1>
      
      <TodoForm />
      
      <div className="mt-8">
        {/* Conditional Rendering: Loading, Error, atau List */}
        
        {isLoading && <Loader />} 
        
        {isError && (
            <p className="text-red-500 text-center p-4 border border-red-200 bg-red-50 rounded-lg">
                ❌ Gagal memuat data. Periksa Token JWT di client.ts.
            </p>
        )}
        
        {/* Tampilkan List dengan fungsi wrapper yang baru */}
        {!isLoading && !isError && todos && todos.length > 0 && (
          // Meneruskan fungsi wrapper yang sudah benar tipenya
          <TodoList todos={todos} onUpdateStatus={handleUpdateStatus} /> 
        )}

        {/* Empty State */}
        {!isLoading && !isError && todos && todos.length === 0 && (
          <p className="text-center text-gray-500 p-10 border border-dashed rounded-lg mt-4">
            🎉 Semua tugas selesai! Tambahkan yang pertama.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;