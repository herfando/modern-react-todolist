import React, { useState } from 'react';
import { useTodos } from '../../../hooks/useTodos';
import Button from '../../ui/button/Button';

// Komponen Container (Mengandung Logika State & Hook)
const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { createTodo, isLoading } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isLoading) return; 

    createTodo(title, {
        onSuccess: () => {
            setTitle(''); // Reset form setelah sukses
        }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        disabled={isLoading}
      />
      {/* Menggunakan Button Reusable dengan props isLoading */}
      <Button 
        type="submit" 
        variant="primary" 
        isLoading={isLoading} 
      >
        Tambah
      </Button>
    </form>
  );
};

export default TodoForm;