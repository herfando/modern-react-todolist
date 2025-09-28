import { useState, useEffect } from "react";
import { todoService } from "../services/todo.service";
import type { Todo, CreateTodoPayload } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 🔹 Ambil semua todos dari API
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Tambah todo baru
  const addTodo = async (payload: CreateTodoPayload) => {
    try {
      const newTodo = await todoService.createTodo(payload);
      setTodos((prev) => [...prev, newTodo]); // langsung update state
    } catch (err: any) {
      console.error("Gagal menambah todo:", err.response?.data || err.message);
    }
  };

  // 🔹 Toggle status todo
  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const updated = await todoService.updateTodoStatus(id, { completed });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updated : todo))
      );
    } catch (err: any) {
      console.error("Gagal update todo:", err.response?.data || err.message);
    }
  };

  // 🔹 Hapus todo
  const deleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err: any) {
      console.error("Gagal menghapus todo:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
