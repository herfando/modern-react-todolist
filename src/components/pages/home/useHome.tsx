import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../../services/todo.service";

export const useHome = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return { todos: data ?? [], isLoading, isError };
};
