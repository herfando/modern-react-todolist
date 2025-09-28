// src/components/container/TodoForm/TodoForm.tsx

import React, { useState } from 'react';
import { useTodos } from '../../../hooks/useTodos';
import Button from '../../ui/button/Button';
import type { CreateTodoPayload } from '../../../types/todo';

// Komponen Container (Mengandung Logika State & Hook)
const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const { createTodo, isLoading } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isLoading) return;

    const newTodoPayload: CreateTodoPayload = {
      title: title,
      date: new Date().toISOString().split('T')[0], // format yyyy-mm-dd
      priority: 'Medium',
      completed: false, // ✅ WAJIB
    };

    console.log("Payload TodoForm:", newTodoPayload);

    createTodo(newTodoPayload, {
      onSuccess: () => {
        setTitle('');
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-4 bg-gray-900 rounded-lg shadow-md"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
        disabled={isLoading}
      />
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:bg-gray-600"
      >
        {isLoading ? 'Menambah...' : 'Tambah'}
      </Button>
    </form>
  );
};

export default TodoForm;
