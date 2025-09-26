// src/components/pages/home/useHome.tsx (FULL CODE - PERBAIKAN IMPORT DAN LOGIC)

import { useMutation, useQuery } from "@tanstack/react-query";
// PERBAIKAN: Import 'todoService' sebagai objek tunggal yang diekspor
import { todoService } from "../../../services/todo.service"; 
import type { Todo } from "../../../types/todo"; 

export const useHome = () => {
    
    // 1. QUERY: Mengambil daftar todo
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery<Todo[]>({
        queryKey: ["todos"],
        // PERBAIKAN: Gunakan todoService.getAllTodos (nama yang benar dari service)
        queryFn: todoService.getAllTodos, 
    });

    // 2. MUTATION: Update status todo (dipanggil dari TodoList)
    const { mutate: updateTodo, isPending: isUpdating } = useMutation<
        Todo, // Tipe hasil sukses
        Error, // Tipe error
        { id: string; isCompleted: boolean } // Payload yang dibutuhkan
    >({
        // PERBAIKAN: Panggil updateTodoStatus dan SUNTIKKAN ID dari payload
        mutationFn: ({ id, isCompleted }) => 
            // todoService.updateTodoStatus membutuhkan ID dan Payload terpisah
            // Payload di sini adalah { isCompleted: boolean }
            todoService.updateTodoStatus(id, { isCompleted: isCompleted }), 
            
        onSuccess: () => {
            refetch(); // Refresh daftar todo setelah update berhasil
        },
    });

    return { 
        todos: data ?? [], 
        isLoading, 
        isError, 
        error,
        isFetching,
        updateTodo, 
        isUpdating 
    };
};