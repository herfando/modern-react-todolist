// call to api server using axios here
// src/services/todoService.ts

import axios from 'axios';
import { Todo, AddTodo } from '../types/todo';

// Mendapatkan URL API dari file .env
const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

/**
 * Mengambil semua todo dari API.
 * @returns {Promise<Todo[]>} - Promise yang berisi array objek todo.
 */
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/todos`);
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

/**
 * Membuat todo baru di API.
 * @param {AddTodo} newTodo - Objek todo baru tanpa ID.
 * @returns {Promise<Todo>} - Promise yang berisi objek todo yang baru dibuat.
 */
export const createTodo = async (newTodo: AddTodo): Promise<Todo> => {
  try {
    const { data } = await axios.post(`${API_URL}/todos`, newTodo);
    return data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

/**
 * Memperbarui todo yang sudah ada di API.
 * @param {string} id - ID unik dari todo.
 * @param {Partial<Todo>} updatedTodo - Objek yang berisi properti yang akan diperbarui.
 * @returns {Promise<Todo>} - Promise yang berisi objek todo yang diperbarui.
 */
export const updateTodo = async (id: string, updatedTodo: Partial<Todo>): Promise<Todo> => {
  try {
    const { data } = await axios.patch(`${API_URL}/todos/${id}`, updatedTodo);
    return data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Menghapus todo dari API.
 * @param {string} id - ID unik dari todo yang akan dihapus.
 * @returns {Promise<void>} - Promise kosong setelah penghapusan berhasil.
 */
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};