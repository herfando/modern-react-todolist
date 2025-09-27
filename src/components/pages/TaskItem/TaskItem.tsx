import React, { useState, useRef, useEffect } from 'react';

// --- SVG Icons (Lucide Icons) ---

// Icon untuk Edit/Delete menu (Titik tiga / More)
const MoreVerticalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);

// Icon untuk Checkbox (Completed)
const CheckSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

// Icon untuk Checkbox (Uncompleted/Empty)
const SquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
);

// Icon untuk Edit
const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
);

// Icon untuk Delete
const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);

// --- Tipe Data dan Props ---

type Priority = 'Low' | 'Medium' | 'High';

interface Task {
    id: string;
    title: string;
    dueDate: string; // Format YYYY-MM-DD
    priority: Priority;
    isCompleted: boolean;
}

interface TaskItemProps {
    task: Task;
    // Asumsi: isDarkMode akan diterima dari parent atau context (mengikuti placeholder sebelumnya)
    isDarkMode: boolean; 
    onToggleComplete: (id: string) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

// --- Komponen TaskItem ---

const TaskItem: React.FC<TaskItemProps> = ({ task, isDarkMode, onToggleComplete, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Styling Prioritas
    const getPriorityClasses = (priority: Priority) => {
        switch (priority) {
            case 'Low':
                return 'bg-green-500/10 text-green-400 border-green-500/30';
            case 'Medium':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
            case 'High':
                return 'bg-pink-500/10 text-pink-400 border-pink-500/30';
        }
    };

    // Format Tanggal
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        try {
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (e) {
            return dateString; // Fallback
        }
    };
    
    // Handle klik di luar menu untuk menutupnya
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current && 
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const taskTitleClasses = `font-medium truncate ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
    } ${task.isCompleted ? 'line-through opacity-60' : ''}`;

    const dateClasses = `text-xs ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
    } ${task.isCompleted ? 'line-through opacity-60' : ''}`;

    const itemContainerClasses = isDarkMode
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/70'
        : 'bg-white border-gray-200 hover:bg-gray-50';

    const handleEditClick = () => {
        onEdit(task);
        setIsMenuOpen(false);
    };

    const handleDeleteClick = () => {
        onDelete(task.id);
        setIsMenuOpen(false);
    };

    return (
        <div className={`flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${itemContainerClasses}`}>
            
            {/* Checkbox */}
            <button 
                onClick={() => onToggleComplete(task.id)}
                className={`p-1 rounded-full transition-colors shrink-0 
                    ${task.isCompleted 
                        ? 'text-blue-500' 
                        : isDarkMode ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`
                }
                aria-label={task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
            >
                {task.isCompleted ? <CheckSquareIcon fill="currentColor" /> : <SquareIcon />}
            </button>
            
            {/* Task Details */}
            <div className="flex-grow min-w-0 mx-3 space-y-1">
                <p className={taskTitleClasses} title={task.title}>
                    {task.title}
                </p>
                <div className="flex items-center space-x-2 text-xs">
                    {/* Priority Tag */}
                    <span className={`px-2 py-0.5 rounded-full font-semibold border ${getPriorityClasses(task.priority)}`}>
                        {task.priority}
                    </span>
                    {/* Due Date */}
                    <span className={dateClasses}>
                        {formatDate(task.dueDate)}
                    </span>
                </div>
            </div>
            
            {/* Action Menu (Titik Tiga) */}
            <div className="relative shrink-0">
                <button
                    ref={buttonRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                    aria-expanded={isMenuOpen}
                    aria-label="More actions"
                >
                    <MoreVerticalIcon className="w-5 h-5" />
                </button>

                {/* Dropdown Menu (Overlay di atas task) */}
                {isMenuOpen && (
                    <div 
                        ref={menuRef}
                        className={`absolute right-0 top-full mt-2 w-32 rounded-lg shadow-xl z-10 transition-opacity duration-150 ${
                            isDarkMode 
                                ? 'bg-gray-700 border border-gray-600 text-gray-200' 
                                : 'bg-white border border-gray-100 text-gray-800'
                        }`}
                        style={{ transform: 'translateY(5px)' }} // Sedikit turun agar terpisah dari tombol
                    >
                        <button 
                            onClick={handleEditClick}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm rounded-t-lg transition-colors ${
                                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                            }`}
                        >
                            <PencilIcon className="w-4 h-4 mr-2 text-blue-400" />
                            Edit
                        </button>
                        <button 
                            onClick={handleDeleteClick}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm rounded-b-lg transition-colors ${
                                isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                            }`}
                        >
                            <TrashIcon className="w-4 h-4 mr-2 text-red-400" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
