// src/components/TodoItem/TodoItem.tsx (FULL CODE - Perbaikan)

import React from 'react';
// Hapus import Todo karena sudah tercakup di TodoItemProps.
// Gunakan 'import type' untuk Props
import type { TodoItemProps } from '../../../types/todo'; 

// Helper untuk styling prioritas
const getPriorityStyles = (priority: 'Low' | 'Medium' | 'High'): string => {
  switch (priority) {
    case 'Low': return 'bg-green-600/20 text-green-400';
    case 'Medium': return 'bg-yellow-600/20 text-yellow-400';
    case 'High': return 'bg-red-600/20 text-red-400';
    default: return 'bg-gray-600/20 text-gray-400';
  }
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateStatus, onDelete }) => {
  
  const { id, title, date, priority, isCompleted } = todo; // Destructuring todo object

  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleToggle = () => {
    onUpdateStatus(id, !isCompleted);
  };
  
  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      onDelete(id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors">
      <div className="flex items-center space-x-3" onClick={handleToggle}>
        {/* Checkbox status */}
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={() => {}} 
          className="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded-full focus:ring-blue-500 cursor-pointer"
        />
        
        <div className='flex flex-col'>
          {/* Judul Tugas */}
          <span className={`text-lg font-medium ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
            {title}
          </span>
          
          <div className='flex items-center space-x-3 text-sm mt-1'>
            {/* Tanggal */}
            <span className="text-gray-400">
              {formattedDate}
            </span>
            {/* Prioritas Badge */}
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityStyles(priority)}`}>
              {priority}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tombol aksi (Delete) */}
      <button 
        onClick={handleDelete}
        className="text-red-400 hover:text-red-300 p-2 rounded-full transition-colors"
        title="Hapus Tugas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};