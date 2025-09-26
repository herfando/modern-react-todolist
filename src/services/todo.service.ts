// src/services/todo.service.ts (FULL CODE - FINAL VERSI ANDA)

import client from '../api/client';
import type { Todo, CreateTodoPayload, UpdateTodoPayload } from '../types/todo';

const TODO_ENDPOINT = '/todos'; 

export const todoService = { // <--- Ekspor objek tunggal ini
 // 1. READ ALL (R)
 getAllTodos: async (): Promise<Todo[]> => { // <-- Nama fungsi yang benar
  const response = await client.get(TODO_ENDPOINT); 
  return response.data; 
 },

 // 2. CREATE (C)
 createTodo: async (payload: CreateTodoPayload): Promise<Todo> => {
  const response = await client.post(TODO_ENDPOINT, payload);
  return response.data;
 },

 // 3. UPDATE Status (U)
 // Fungsi ini akan digunakan oleh useHome.tsx
 updateTodoStatus: async (id: string, payload: UpdateTodoPayload): Promise<Todo> => {   // Asumsi API Anda menerima PATCH untuk update sebagian
  const response = await client.patch(`${TODO_ENDPOINT}/${id}`, payload);
  return response.data;
 },

 // 4. DELETE (D)
 deleteTodo: async (id: string): Promise<void> => {
  await client.delete(`${TODO_ENDPOINT}/${id}`);
 },
};