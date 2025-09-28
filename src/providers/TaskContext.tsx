// src/providers/TaskContext.tsx

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { format } from 'date-fns';

// Definisikan Tipe Data Tugas
interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Upcoming' | 'Today' | 'Completed';
}

interface TaskContextType {
    tasks: Task[];
    addTask: (title: string, priority: 'Low' | 'Medium' | 'High', dueDate: string) => void;
    editTask: (taskId: number, newTitle: string, newPriority: 'Low' | 'Medium' | 'High', newDueDate: string) => void;
    deleteTask: (taskId: number) => void;
    completeTask: (taskId: number) => void;
}

// Data Awal untuk contoh
const initialTasks: Task[] = [
    { id: 1, title: "Practice about Frontend Developer", dueDate: "Aug 5, 2025", priority: 'Low', status: 'Today' },
    { id: 2, title: "Complete JavaScript Algorithms", dueDate: "Sep 12, 2025", priority: 'Medium', status: 'Today' },
    { id: 3, title: "Build a Responsive Website", dueDate: "Oct 20, 2025", priority: 'High', status: 'Today' },
    { id: 4, title: "Explore CSS Frameworks", dueDate: "Nov 15, 2025", priority: 'Low', status: 'Today' },
    { id: 5, title: "Set up Database Schema", dueDate: "Nov 20, 2025", priority: 'Medium', status: 'Upcoming' },
    { id: 6, title: "Design Landing Page UI", dueDate: "Nov 25, 2025", priority: 'High', status: 'Upcoming' },
    { id: 7, title: "Finished React Course", dueDate: "Jul 10, 2025", priority: 'Low', status: 'Completed' },
    { id: 8, title: "Learned Tailwind CSS", dueDate: "Jul 15, 2025", priority: 'Medium', status: 'Completed' },
    { id: 9, title: "Fix login page UI", dueDate: "Nov 20, 2025", priority: 'High', status: 'Upcoming' },
    { id: 10, title: "Deploy backend API", dueDate: "Nov 22, 2025", priority: 'High', status: 'Upcoming' },
];

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const addTask = useCallback((title: string, priority: 'Low' | 'Medium' | 'High', dueDate: string) => {
        setTasks(prevTasks => {
            const newId = prevTasks.length > 0 ? Math.max(...prevTasks.map(t => t.id)) + 1 : 1;
            const newTask: Task = {
                id: newId,
                title,
                dueDate: format(new Date(dueDate), 'MMM d, yyyy'),
                priority,
                status: 'Upcoming',
            };
            return [...prevTasks, newTask];
        });
    }, []);

    const editTask = useCallback((taskId: number, newTitle: string, newPriority: 'Low' | 'Medium' | 'High', newDueDate: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        title: newTitle,
                        priority: newPriority,
                        dueDate: format(new Date(newDueDate), 'MMM d, yyyy')
                    }
                    : task
            )
        );
    }, []);

    const deleteTask = useCallback((taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);

    const completeTask = useCallback((taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: 'Completed' } : task
            )
        );
    }, []);

    const value = {
        tasks,
        addTask,
        editTask,
        deleteTask,
        completeTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};