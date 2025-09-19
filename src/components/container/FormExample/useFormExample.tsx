import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../lib/validation/auth.validation";
import { loginUser } from "../../../services/auth.service";
import type { UserAuthTypes } from "../../../types/Auth.type";

const useFormExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: UserAuthTypes) => loginUser(data.email, data.password),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: UserAuthTypes) => {
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
