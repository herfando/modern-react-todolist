import React, { useState } from 'react';
// PENTING: Pastikan jalur ini benar untuk tipe Anda
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

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateStatus, onDelete }) => {
  // Menambahkan state loading untuk visual feedback saat delete
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Destructuring todo object. Asumsi: todo memiliki properti { id, title, date, priority, isCompleted }
  const { id, title, date, priority, isCompleted } = todo; 

  // Menggunakan try/catch untuk date formatting jika 'date' mungkin null/undefined
  let formattedDate = '';
  try {
    formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    formattedDate = 'No Date';
  }

  const handleToggle = () => {
    onUpdateStatus(id, !isCompleted);
  };
  
  const handleDelete = () => {
    // KARENA window.confirm() TIDAK BOLEH DIGUNAKAN DI CANVAS:
    // Kita panggil onDelete() secara langsung dan menambahkan feedback visual 'isDeleting'
    setIsDeleting(true);
    onDelete(id);
  };

  return (
    <div 
        className={`
            flex items-center justify-between p-4 bg-gray-900 rounded-xl transition-colors relative
            ${isDeleting ? 'opacity-50 blur-sm pointer-events-none' : 'hover:bg-gray-800'}
        `}
    >
        {isDeleting && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-950/70 text-red-400 font-bold rounded-xl">
                Menghapus...
            </div>
        )}
      <div className="flex items-center space-x-3 flex-1 min-w-0" onClick={handleToggle}>
        {/* Checkbox status */}
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={() => {}} // onChange handler kosong karena logika di handleToggle (onClick div)
          className="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded-full focus:ring-blue-500 cursor-pointer flex-shrink-0"
        />
        
        <div className='flex flex-col truncate'>
          {/* Judul Tugas */}
          <span className={`text-lg font-medium truncate ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>
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
        className="text-red-400 hover:text-red-300 p-2 rounded-full transition-colors flex-shrink-0"
        title="Hapus Tugas"
        disabled={isDeleting}
      >
        {/* Ikon Trash (Tempatkan SVG di sini) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export { TodoItem };
export default TodoItem;
