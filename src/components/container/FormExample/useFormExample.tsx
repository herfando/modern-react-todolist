// src/components/FormExample/useFormExample.tsx (FULL CODE - PERBAIKAN IMPORT DAN LOGIN)

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// Pastikan path ke validation Anda benar
import { loginSchema } from "../../../lib/validation/auth.validation"; 
// Import yang benar (kita akan ubah logic mutasi agar tidak perlu import authService)
import type { LoginPayload } from "../../../types/Auth.type"; 
import { authService } from "../../../services/auth.service"; 

const useFormExample = () => {
    // Gunakan LoginPayload sebagai type default data form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
    });

    // Mutasi sekarang menggunakan authService.login yang kita buat
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        // mutationFn menerima data LoginPayload ({ email, password })
        mutationFn: (data: LoginPayload) => authService.login(data),
        
        onSuccess: (data) => {
            console.log("Login berhasil!", data);
            // Tambahkan logika sukses (misalnya simpan token atau redirect)
        },
        onError: (error: any) => {
            console.error("Login gagal:", error.response?.data?.message || error.message);
        },
    });

    // data sekarang bertipe LoginPayload
    const onSubmit = (data: LoginPayload) => {
        mutate(data);
    };

    return {
        register,
        handleSubmit,
        errors,
        reset,
        onSubmit,
        isPending,
        isError,
        error,
        isSuccess,
    };
};

export default useFormExample;