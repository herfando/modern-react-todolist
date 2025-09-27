import React from 'react';

// Icon untuk Task (Placeholder)
const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M10 12l2 2l4-4" />
        <path d="M10 17h4" />
    </svg>
);

interface EmptyStateProps {
    type: 'data' | 'search'; // Tipe empty state: data kosong atau hasil pencarian kosong
    isDarkMode: boolean;
    onAddTask: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, isDarkMode, onAddTask }) => {
    
    const isDataEmpty = type === 'data';

    const title = isDataEmpty ? "Nothing to do yet!" : "Try a different keyword.";
    const description = isDataEmpty 
        ? "Your productivity starts here. Let's add your first task!" 
        : "We couldn't find any tasks matching your search. Clear the search or try again.";
    
    const bgColor = isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200';
    const textColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

    return (
        <div 
            className={`flex flex-col items-center justify-center p-8 text-center rounded-xl border-2 border-dashed ${bgColor} h-64 mx-auto my-8 max-w-lg transition-colors duration-300`}
        >
            <ClipboardListIcon className={`mb-4 ${textColor}`} />
            
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {title}
            </h3>
            
            <p className={`text-sm mb-6 max-w-xs ${textColor}`}>
                {description}
            </p>

            {/* Tombol Add Task hanya muncul jika datanya benar-benar kosong */}
            {isDataEmpty && (
                <button
                    onClick={onAddTask}
                    className="flex items-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                >
                    + Add Task
                </button>
            )}
        </div>
    );
};

export default EmptyState;
