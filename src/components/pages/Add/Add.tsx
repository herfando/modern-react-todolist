// src/components/container/AddTaskModal/AddTaskModal.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../providers/ThemeProvider';

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

type Priority = 'Low' | 'Medium' | 'High' | '';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, priority: Priority, date: string, completed: boolean) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('');
  const [dueDate, setDueDate] = useState('');

  const [errors, setErrors] = useState({ title: false, priority: false, dueDate: false });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTaskTitle('');
      setPriority('');
      setDueDate('');
      setErrors({ title: false, priority: false, dueDate: false });
      setSuccessMessage(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSave = () => {
    let hasError = false;
    const newErrors = { title: false, priority: false, dueDate: false };

    if (!taskTitle.trim()) { newErrors.title = true; hasError = true; }
    if (!priority) { newErrors.priority = true; hasError = true; }
    if (!dueDate) { newErrors.dueDate = true; hasError = true; }

    setErrors(newErrors);

    if (!hasError) {
      const payload = {
        title: taskTitle,
        priority: priority,
        date: dueDate,
        completed: false, // ✅ Wajib biar backend gak error
      };

      console.log("Payload AddTaskModal:", payload);

      onSave(taskTitle, priority, dueDate, false);

      setSuccessMessage("Task Added!");
      setTimeout(() => { onClose(); }, 1000);
    }
  };

  if (!isOpen) return null;

  const modalBgClasses = isDarkMode ? 'bg-gray-900 shadow-2xl shadow-black/60 border border-gray-700' : 'bg-white shadow-2xl shadow-gray-400/40 border border-gray-100';
  const inputClasses = (isError: boolean) =>
    `w-full p-3 rounded-xl border outline-none ${
      isDarkMode ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-700' : 'bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-200'
    } focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${isError ? 'border-red-500 ring-red-500/50' : ''}`;
  const errorTextClasses = 'text-red-500 text-xs mt-1 ml-1';
  const successClasses = isDarkMode ? 'bg-green-700 text-white border-green-600' : 'bg-green-500 text-white border-green-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div ref={modalRef} className={`w-11/12 max-w-sm rounded-2xl p-6 ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Task</h2>
          <button onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'} p-1 rounded-full`}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {successMessage && (
          <div className={`flex items-center p-3 mb-4 rounded-xl border ${successClasses}`}>
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your task"
              className={inputClasses(errors.title)}
              value={taskTitle}
              onChange={(e) => { setTaskTitle(e.target.value); if (e.target.value.trim()) setErrors(prev => ({ ...prev, title: false })); }}
            />
            {errors.title && <p className={errorTextClasses}>Task title required</p>}
          </div>

          <div>
            <div className="relative">
              <select
                className={`${inputClasses(errors.priority)} appearance-none pr-10 cursor-pointer`}
                value={priority}
                onChange={(e) => { setPriority(e.target.value as Priority); if (e.target.value) setErrors(prev => ({ ...prev, priority: false })); }}
              >
                <option value="" disabled>Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <ChevronDownIcon className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            {errors.priority && <p className={errorTextClasses}>Priority required</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type="date"
                className={`${inputClasses(errors.dueDate)} cursor-pointer pr-10`}
                value={dueDate}
                onChange={(e) => { setDueDate(e.target.value); if (e.target.value) setErrors(prev => ({ ...prev, dueDate: false })); }}
              />
              <CalendarIcon className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            {errors.dueDate && <p className={errorTextClasses}>Due date required</p>}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className={`w-full py-3 rounded-xl font-semibold transition-all active:scale-[0.98] ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
