import React, { useState } from 'react';
import { useAuth } from '../../../providers/AuthContext';
import { useTheme } from '../../../providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';

// --- Komponen SVG Icon (Lucide Icons) ---
const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);
const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v.44a2 2 0 0 1-2 2v.44a2 2 0 0 0-2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2 2v.44a2 2 0 0 0 2 2h.44a2 2 0 0 1 2-2v-.44a2 2 0 0 0 2-2h.44a2 2 0 0 1 2-2v-.44a2 2 0 0 0 2-2h-.44a2 2 0 0 1-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2v-.44a2 2 0 0 0-2-2h-.44a2 2 0 0 1-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const MoreHorizontalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.69-8.91" />
        <path d="M11 19v-4.5c0-.83.67-1.5 1.5-1.5h.5" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);
const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);
const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
// ------------------------------------------

// --- MOCK DATA TUGAS (MENGAMBIL DARI Today.tsx) ---
interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Today' | 'Upcoming' | 'Completed';
}

const mockTasks: Task[] = [
    { id: 1, title: "Practice about Frontend Developer", dueDate: "Aug 5, 2025", priority: 'Low', status: 'Today' },
    { id: 2, title: "Complete JavaScript Algorithms", dueDate: "Sep 12, 2025", priority: 'Medium', status: 'Today' },
    { id: 3, title: "Build a Responsive Website", dueDate: "Oct 20, 2025", priority: 'High', status: 'Today' },
    { id: 4, title: "Explore CSS Frameworks", dueDate: "Nov 15, 2025", priority: 'Low', status: 'Today' },
    { id: 5, title: "Set up Database Schema", dueDate: "Nov 20, 2025", priority: 'Medium', status: 'Upcoming' },
    { id: 6, title: "Design Landing Page UI", dueDate: "Nov 25, 2025", priority: 'High', status: 'Upcoming' },
    { id: 7, title: "Finished React Course (Completed)", dueDate: "Jul 10, 2025", priority: 'Low', status: 'Completed' },
    { id: 8, title: "Learned Tailwind CSS (Completed)", dueDate: "Jul 15, 2025", priority: 'Medium', status: 'Completed' },
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

// Fungsi Komponen Task Card (Sama seperti Today.tsx)
const TaskCard: React.FC<{ task: Task, isDarkMode: boolean }> = ({ task, isDarkMode }) => {
    const priorityClasses = getPriorityClasses(task.priority, isDarkMode);
    const cardBaseClasses = isDarkMode 
        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700/80' 
        : 'bg-white border-gray-200 hover:shadow-md hover:border-blue-300';

    const textMutedClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className={`p-4 border rounded-xl transition-all duration-300 ${cardBaseClasses} flex justify-between items-start gap-4`}>
            <div className="flex items-start flex-grow min-w-0">
                <button className={`mt-1 p-0.5 rounded-full transition-colors ${isDarkMode ? 'text-gray-500 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`}>
                    <CheckCircleIcon className="w-6 h-6" />
                </button>
                <div className="ml-3 min-w-0">
                    <h3 className={`text-base font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{task.title}</h3>
                    <p className={`text-xs ${textMutedClasses} mt-1`}>Due: {task.dueDate}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 mt-2 rounded-full text-xs font-medium ${priorityClasses}`}>
                        {task.priority}
                    </span>
                </div>
            </div>
            
            <button className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                <MoreHorizontalIcon className="w-5 h-5" />
            </button>
        </div>
    );
};


const Upcoming: React.FC = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    // Filter tasks hanya yang berstatus 'Upcoming'
    const upcomingTasks = mockTasks.filter(task => task.status === 'Upcoming');

    // Kelas Styling Global
    const containerClasses = isDarkMode 
        ? 'bg-[#0B0B0D] text-white' 
        : 'bg-gray-50 text-gray-900';
    
    const cardBgClasses = isDarkMode 
        ? 'bg-gray-900 shadow-2xl shadow-black/30' 
        : 'bg-white shadow-xl shadow-gray-200/50';

    const headerTextClasses = isDarkMode ? 'text-white' : 'text-gray-900';
    const subHeaderTextClasses = isDarkMode ? 'text-gray-400' : 'text-gray-500';

    const searchInputClasses = isDarkMode 
        ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-700' 
        : 'bg-gray-100 text-gray-900 placeholder-gray-400 border-gray-200';

    const tabClasses = (tab: string) => 
        `px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${isDarkMode 
            ? (tab === 'Upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-300 hover:bg-gray-700') 
            : (tab === 'Upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-300/60' : 'text-gray-700 hover:bg-gray-200')
        }`;

    const handleLogout = () => {
        logout();
        navigate('/login');
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
                    <button className={tabClasses('Today')} onClick={() => navigate('/today')}>Today</button>
                    <button className={tabClasses('Upcoming')} onClick={() => {}}>Upcoming</button>
                    <button className={tabClasses('Completed')} onClick={() => navigate('/completed')}>Completed</button>
                </div>

                {/* Section Judul & Jumlah Item */}
                <div className="mb-4">
                    <h3 className={`text-lg font-semibold ${headerTextClasses}`}>
                        Upcoming 
                        <span className={`ml-2 text-sm font-normal px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                            {upcomingTasks.length} Item
                        </span>
                    </h3>
                    <p className={`text-sm ${subHeaderTextClasses}`}>
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Daftar Tugas */}
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {upcomingTasks.map(task => (
                        <TaskCard key={task.id} task={task} isDarkMode={isDarkMode} />
                    ))}
                    
                    {upcomingTasks.length === 0 && (
                        <p className={`text-center py-10 ${subHeaderTextClasses}`}>No tasks found for Upcoming.</p>
                    )}
                </div>

                {/* Tombol Tambah Tugas */}
                <div className="mt-8">
                    <button className={`w-full flex items-center justify-center py-3 rounded-xl transition-all duration-300 transform active:scale-[0.98] ${isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-300/50'}`}>
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add Task
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Upcoming;
