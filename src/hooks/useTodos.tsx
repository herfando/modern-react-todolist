// src/hooks/useTodos.tsx (FULL CODE - PERBAIKAN AKHIR DARI WARNING)

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todo.service';
import type { Todo, CreateTodoPayload } from '../types/todo'; 

const TODO_QUERY_KEY = 'todos';

export const useTodos = () => {
  const queryClient = useQueryClient();
  
  // ===================================
  // 1. QUERY: Mengambil Data (READ)
  // ===================================
  const todoQuery = useQuery<Todo[]>({
    queryKey: [TODO_QUERY_KEY], 
    queryFn: todoService.getAllTodos, 
    staleTime: 1000 * 60 * 5, 
  });

  // ===================================
  // 2. MUTATION: Membuat Data (CREATE)
  // ===================================
  const createTodoMutation = useMutation({
    mutationFn: (payload: CreateTodoPayload) => todoService.createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  // ===================================
  // 3. MUTATION: Mengupdate Status (UPDATE)
  // ===================================
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: string, newStatus: boolean }) => 
      todoService.updateTodoStatus(id, { isCompleted: newStatus }),
    
    // Optimistic Update
    onMutate: async ({ id, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });
      const previousTodos = queryClient.getQueryData<Todo[]>([TODO_QUERY_KEY]);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>([TODO_QUERY_KEY], 
          previousTodos.map(todo => 
            todo.id === id ? { ...todo, isCompleted: newStatus } : todo
          )
        );
      }

      return { previousTodos }; 
    },
    
    // PERBAIKAN WARNING: Gunakan _variables pada parameter yang tidak terpakai
    onError: (err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData([TODO_QUERY_KEY], context.previousTodos);
        alert(`Gagal mengupdate status: ${(err as Error).message}`);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });

  // ===================================
  // 4. MUTATION: Menghapus Data (DELETE)
  // ===================================
  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });


  return {
    todos: todoQuery.data || [], 
    isLoading: todoQuery.isLoading,
    isFetching: todoQuery.isFetching,
    error: todoQuery.error,
    createTodo: createTodoMutation.mutate, 
    isCreating: createTodoMutation.isPending,
    updateTodoStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    deleteTodo: deleteTodoMutation.mutate,
    isDeleting: deleteTodoMutation.isPending,
  };
};