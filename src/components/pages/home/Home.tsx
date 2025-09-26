// src/components/container/TodoList/TodoList.tsx (FULL CODE - DUMMY DENGAN PROPS)

import React from 'react';
// WAJIB: Import type Todo (pastikan path ini benar)
import type { Todo } from '../../../types/todo'; 

// DEFINISI PROPS WAJIB
interface TodoListProps {
    // Memastikan TodoList menerima array Todo
    todos: Todo[];
    // Memastikan TodoList menerima handler untuk update status
    onUpdateStatus: (id: string, newStatus: boolean) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateStatus }) => {
    // Tambahkan styling di sini untuk memastikan Dark Mode bekerja
    return (
        <div className="space-y-3 mt-6">
            <h2 className="text-xl font-bold text-gray-200 mb-4">Daftar Tugas Aktif</h2>
            {todos.length === 0 ? (
                 <p className="text-gray-400">Tidak ada tugas yang terdaftar.</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id} className="p-4 bg-gray-800 rounded-lg shadow-xl flex justify-between items-center border border-gray-700">
                        
                        <span className={`text-lg ${todo.isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
                            {todo.title} - Prioritas: {todo.priority}
                        </span>
                        
                        <button 
                            onClick={() => onUpdateStatus(todo.id, !todo.isCompleted)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors 
                                ${todo.isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} 
                                text-white`}
                        >
                            {todo.isCompleted ? "Belum Selesai" : "Selesai"}
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodoList;