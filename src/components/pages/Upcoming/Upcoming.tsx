import React, { useState } from 'react';
import { useAuth } from '../../../providers/AuthContext';
import { useTheme } from '../../../providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

// --- Komponen SVG Icon ---
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2v.44a2 2 0 0 0-2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2-2v-.44a2 2 0 0 0 2-2h.44a2 2 0 0 1 2-2v-.44a2 2 0 0 0 2-2h-.44a2 2 0 0 1-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const MoreHorizontalIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);
const PlusIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.69-8.91" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
const MoonIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);
const SunIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);
const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m15 18-6-6 6-6" />
    </svg>
);
const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m9 18 6-6-6-6" />
    </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);
const EditIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
);
const TrashIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
);
// ------------------------------------------

// --- MOCK DATA TUGAS ---
interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Today' | 'Upcoming' | 'Completed';
}

const initialTasks: Task[] = [
    { id: 1, title: "Practice about Frontend Developer", dueDate: "Aug 5, 2025", priority: 'Low', status: 'Today' },
    { id: 2, title: "Complete JavaScript Algorithms", dueDate: "Sep 12, 2025", priority: 'Medium', status: 'Today' },
    { id: 3, title: "Build a Responsive Website", dueDate: "Oct 20, 2025", priority: 'High', status: 'Today' },
    { id: 4, title: "Explore CSS Frameworks", dueDate: "Nov 15, 2025", priority: 'Low', status: 'Today' },
    { id: 5, title: "Set up Database Schema", dueDate: "Nov 20, 2025", priority: 'Medium', status: 'Upcoming' },
    { id: 6, title: "Design Landing Page UI", dueDate: "Nov 25, 2025", priority: 'High', status: 'Upcoming' },
    { id: 7, title: "Finished React Course (Completed)", dueDate: "Jul 10, 2025", priority: 'Low', status: 'Completed' },
    { id: 8, title: "Learned Tailwind CSS (Completed)", dueDate: "Jul 15, 2025", priority: 'Medium', status: 'Completed' },
    { id: 9, title: "Fix login page UI", dueDate: "Nov 20, 2025", priority: 'High', status: 'Upcoming' },
    { id: 10, title: "Deploy backend API", dueDate: "Nov 22, 2025", priority: 'High', status: 'Upcoming' },
];
// ------------------------------------------

// Fungsi bantuan untuk mendapatkan warna prioritas
const getPriorityClasses = (priority: Task['priority'], isDarkMode: boolean) => {
    switch (priority) {
        case 'Low':
            return isDarkMode ? 'bg-green-700/50 text-green-300' : 'bg-green-100 text-green-700';
        case 'Medium':
            return isDarkMode ? 'bg-yellow-700/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
        case 'High':
            return isDarkMode ? 'bg-red-700/50 text-red-300' : 'bg-red-100 text-red-700';
    }
};

// Fungsi Komponen Task Card
const TaskCard = ({ task, isDarkMode, onComplete, onEdit, onDelete }) => {
    const priorityClasses = getPriorityClasses(task.priority, isDarkMode);
    const cardBaseClasses = isDarkMode
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/80'
        : 'bg-white border-gray-200 hover:shadow-md hover:border-blue-300';
    const textMutedClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const titleClasses = isDarkMode ? 'text-white' : 'text-gray-900';
    
    // Class untuk garis coret jika statusnya 'Completed'
    const completedClasses = task.status === 'Completed' ? 'line-through opacity-60' : '';

    const handleComplete = (e) => {
        e.stopPropagation();
        onComplete(task.id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(task.id);
    };
    
    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit(task);
    };

    return (
        <div className={`p-4 border rounded-xl transition-all duration-300 ${cardBaseClasses} flex justify-between items-start gap-4`}>
            <div className="flex items-start flex-grow min-w-0">
                {/* Tombol Selesai */}
                <button
                    onClick={handleComplete}
                    className={`mt-1 p-0.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}>
                    <CheckCircleIcon className="w-6 h-6" />
                </button>
                <div className="ml-3 min-w-0">
                    <h3 className={`text-base font-semibold truncate ${titleClasses} ${completedClasses}`}>{task.title}</h3>
                    <p className={`text-xs ${textMutedClasses} mt-1`}>Due: {task.dueDate}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-xs font-medium ${priorityClasses}`}>
                        {task.priority}
                    </span>
                </div>
            </div>

            {/* Tombol Aksi (More) */}
            <div className="relative group">
                <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    <MoreHorizontalIcon className="w-5 h-5" />
                </button>
                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg py-1 transition-all duration-300 origin-top-right scale-0 group-hover:scale-100 ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100'}`}>
                    <button
                        onClick={handleEdit}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-blue-600 hover:text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                        <EditIcon className="w-4 h-4 mr-2" /> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center ${isDarkMode ? 'text-gray-300 hover:bg-red-600 hover:text-white' : 'text-gray-700 hover:bg-red-500 hover:text-white'}`}
                    >
                        <TrashIcon className="w-4 h-4 mr-2" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component Utama Upcoming
const Upcoming = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasks, setTasks] = useState(initialTasks);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState('Medium');
    const [newTaskDate, setNewTaskDate] = useState(format(selectedDate, 'yyyy-MM-dd'));

    const upcomingTasks = tasks.filter(task =>
        task.status === 'Upcoming' &&
        isSameDay(new Date(task.dueDate), selectedDate)
    );

    const getWeekData = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(addDays(start, i));
        }
        return week;
    };

    const weekDates = getWeekData(currentDate);

    const containerClasses = isDarkMode ? 'bg-[#0B0B0D] text-white' : 'bg-gray-50 text-gray-900';
    const cardBgClasses = isDarkMode ? 'bg-gray-900 shadow-2xl shadow-black/30' : 'bg-white shadow-xl shadow-gray-200/50';
    const headerTextClasses = isDarkMode ? 'text-white' : 'text-gray-900';
    const subHeaderTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const searchInputClasses = isDarkMode ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-700' : 'bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-200';
    const tabClasses = (tab) =>
        `px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${isDarkMode
            ? (tab === 'Upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-300 hover:bg-gray-700')
            : (tab === 'Upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/60' : 'text-gray-700 hover:bg-gray-200')
        }`;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const goToPreviousWeek = () => {
        setCurrentDate(addDays(currentDate, -7));
    };

    const goToNextWeek = () => {
        setCurrentDate(addDays(currentDate, 7));
    };

    // Fungsi untuk menambah tugas baru
    const handleAddTask = () => {
        if (newTaskTitle.trim() === '') return;
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = {
            id: newId,
            title: newTaskTitle,
            dueDate: format(new Date(newTaskDate), 'MMM d, yyyy'),
            priority: newTaskPriority,
            status: 'Upcoming',
        };
        setTasks([...tasks, newTask]);
        setShowAddModal(false);
        setNewTaskTitle('');
        setNewTaskPriority('Medium');
        setNewTaskDate(format(selectedDate, 'yyyy-MM-dd'));
    };

    // Fungsi untuk menandai tugas sebagai selesai
    const handleCompleteTask = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: 'Completed' } : task
            )
        );
    };

    // Fungsi untuk menghapus tugas
    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    // Fungsi untuk membuka modal edit
    const handleEditTask = (taskToEdit) => {
        setEditingTask(taskToEdit);
        setNewTaskTitle(taskToEdit.title);
        setNewTaskPriority(taskToEdit.priority);
        setNewTaskDate(format(new Date(taskToEdit.dueDate), 'yyyy-MM-dd'));
        setShowEditModal(true);
    };
    
    // Fungsi untuk menyimpan perubahan tugas yang diedit
    const handleSaveEdit = () => {
        if (newTaskTitle.trim() === '' || !editingTask) return;
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTask.id
                    ? {
                        ...task,
                        title: newTaskTitle,
                        priority: newTaskPriority,
                        dueDate: format(new Date(newTaskDate), 'MMM d, yyyy')
                    }
                    : task
            )
        );
        setShowEditModal(false);
        setEditingTask(null);
        setNewTaskTitle('');
        setNewTaskPriority('Medium');
        setNewTaskDate(format(selectedDate, 'yyyy-MM-dd'));
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ${containerClasses} p-4 sm:p-8 flex justify-center`}>
            <div className={`w-full max-w-lg ${cardBgClasses} rounded-2xl p-6 md:p-8 transition-colors duration-500`}>

                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">To Do</h1>
                    <div className="flex items-center space-x-2 relative">
                        <div className="group relative">
                            <button className={`flex items-center p-2 rounded-full font-medium ${isDarkMode ? 'text-white bg-gray-700 hover:bg-gray-600' : 'text-gray-800 bg-gray-100 hover:bg-gray-200'}`}>
                                {user?.name || 'John Doe'}
                                <span className="ml-1 text-xs">▼</span>
                            </button>
                            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-1 transition-all duration-300 origin-top-right scale-0 group-hover:scale-100 ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100'}`}>
                                <button
                                    onClick={handleLogout}
                                    className={`w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-blue-600 hover:text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
                        </button>
                    </div>
                </header>

                <h2 className={`text-xl font-bold mb-1 ${headerTextClasses}`}>What's on Your Plan Today?</h2>
                <p className={`text-sm ${subHeaderTextClasses} mb-6`}>Your productivity starts now.</p>

                <div className="flex items-center space-x-3 mb-6">
                    <div className={`relative flex-grow ${searchInputClasses} rounded-xl border`}>
                        <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <input
                            type="text"
                            placeholder="Search"
                            className={`w-full p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ${searchInputClasses} border-none outline-none`}
                        />
                    </div>
                    <button className={`p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'}`}>
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigasi Tabs */}
                <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
                    <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => navigate('/')}>Today</button>
                    <button className={tabClasses('Upcoming')}>Upcoming</button>
                    <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => navigate('/completed')}>Completed</button>
                </div>

                {/* Bagian Kalender */}
                <div className="flex items-center justify-between">
                    <button onClick={goToPreviousWeek} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}><ChevronLeftIcon className="w-5 h-5" /></button>
                    <div className="flex-grow flex justify-center text-center">
                        <h3 className={`text-lg font-bold ${headerTextClasses}`}>
                            {format(selectedDate, 'MMM d, yyyy')}
                        </h3>
                    </div>
                    <button onClick={goToNextWeek} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}><ChevronRightIcon className="w-5 h-5" /></button>
                </div>

                <div className="flex justify-between items-center my-4 overflow-x-auto space-x-2">
                    {weekDates.map(date => {
                        const dayName = format(date, 'E');
                        const dayNumber = format(date, 'd');
                        const isSelected = isSameDay(date, selectedDate);

                        return (
                            <button
                                key={dayNumber}
                                onClick={() => setSelectedDate(date)}
                                className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-16 rounded-xl transition-all ${isDarkMode
                                    ? (isSelected ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700')
                                    : (isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100')
                                }`}
                            >
                                <span className="text-xs font-medium mb-1">{dayName}</span>
                                <span className={`text-lg font-bold ${isDarkMode ? (isSelected ? 'text-white' : 'text-white') : (isSelected ? 'text-white' : 'text-gray-900')}`}>{dayNumber}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Section Judul & Jumlah Item */}
                <div className="mb-4 mt-6">
                    <h3 className={`text-lg font-semibold ${headerTextClasses}`}>
                        Upcoming
                        <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {upcomingTasks.length} Item
                        </span>
                    </h3>
                </div>

                {/* Daftar Tugas */}
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    {upcomingTasks.length > 0 ? (
                        upcomingTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                isDarkMode={isDarkMode}
                                onComplete={handleCompleteTask}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                            />
                        ))
                    ) : (
                        <p className={`text-center py-10 ${subHeaderTextClasses}`}>Tidak ada tugas untuk tanggal ini.</p>
                    )}
                </div>

                {/* Tombol Tambah Tugas */}
                <div className="mt-8">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className={`w-full flex items-center justify-center py-3 rounded-xl transition-all duration-300 transform active:scale-[0.98] ${isDarkMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-300/50'}`}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Modal untuk Tambah Tugas */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`${cardBgClasses} rounded-xl p-6 w-full max-w-sm`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-bold ${headerTextClasses}`}>Add New Task</h3>
                            <button onClick={() => setShowAddModal(false)} className={`p-1 rounded-full ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}>
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="taskTitle">Task Title</label>
                                <input
                                    type="text"
                                    id="taskTitle"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="taskPriority">Priority</label>
                                <select
                                    id="taskPriority"
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="taskDate">Due Date</label>
                                <input
                                    type="date"
                                    id="taskDate"
                                    value={newTaskDate}
                                    onChange={(e) => setNewTaskDate(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className={`px-4 py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal untuk Edit Tugas */}
            {showEditModal && editingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`${cardBgClasses} rounded-xl p-6 w-full max-w-sm`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-lg font-bold ${headerTextClasses}`}>Edit Task</h3>
                            <button onClick={() => setShowEditModal(false)} className={`p-1 rounded-full ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}>
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="editTaskTitle">Task Title</label>
                                <input
                                    type="text"
                                    id="editTaskTitle"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="editTaskPriority">Priority</label>
                                <select
                                    id="editTaskPriority"
                                    value={newTaskPriority}
                                    onChange={(e) => setNewTaskPriority(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className={`block text-sm font-medium mb-1 ${subHeaderTextClasses}`} htmlFor="editTaskDate">Due Date</label>
                                <input
                                    type="date"
                                    id="editTaskDate"
                                    value={newTaskDate}
                                    onChange={(e) => setNewTaskDate(e.target.value)}
                                    className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${searchInputClasses}`}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className={`px-4 py-2 rounded-lg font-semibold ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upcoming;