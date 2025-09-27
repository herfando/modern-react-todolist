import React from 'react';
import { useAuth } from '../../../providers/AuthContext';
import Button from '../../ui/button/Button';
import TodoForm from '../../container/TodoForm/TodoForm';
import TodoList from '../../container/TodoList/TodoList'; 
import Loader from '../../ui/loader/Loader';
import { useTodos } from '../../../hooks/useTodos';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { isLoading, error, todos } = useTodos(); 

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-950 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        
        <header className="flex justify-between items-center p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 truncate">
            Halo, {user?.name || 'Pengguna'}!
          </h1>
          <Button variant="ghost" onClick={logout} className="ml-4">
            Logout
          </Button>
        </header>

        <TodoForm />

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">Daftar Tugas</h2>
            
            {isLoading && (
                <div className="flex justify-center p-8">
                    <Loader />
                </div>
            )}
            
            {error && ( 
                <div className="text-red-400 text-center p-4">
                    Gagal memuat tugas: {error.message}. Coba muat ulang.
                </div>
            )}

            {!isLoading && !error && todos.length === 0 && (
                <div className="text-gray-500 text-center p-4">
                    Tidak ada tugas saat ini. Tambahkan yang baru di atas!
                </div>
            )}

            {!isLoading && !error && todos.length > 0 && (
                <TodoList todos={todos} /> 
            )}
        </div>

      </div>
    </div>
  );
};

export default Home;