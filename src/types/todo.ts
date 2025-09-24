export interface Todo {
  id: string;
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
}

export interface AddTodo {
  title: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}