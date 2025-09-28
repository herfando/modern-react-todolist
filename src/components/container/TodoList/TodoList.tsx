import React from "react";
import type { Todo } from "../../../types/todo";
import { useTodos } from "../../../hooks/useTodos";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, !todo.completed)}
              className="w-5 h-5 accent-blue-500"
            />
            <div>
              <p
                className={`text-lg font-medium ${
                  todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {todo.title}
              </p>
              <p className="text-sm text-gray-400">
                {todo.priority} • {todo.date}
              </p>
            </div>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-400 hover:text-red-500 transition"
          >
            Hapus
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
