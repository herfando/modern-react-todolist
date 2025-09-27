import React from 'react';

// --- Komponen Individual Skeleton Item ---

interface SkeletonItemProps {
    isDarkMode: boolean;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({ isDarkMode }) => {
    const itemBgClass = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
    const shimmerClass = isDarkMode ? 'shimmer-dark' : 'shimmer-light';

    return (
        // Wrapper Item
        <div className={`flex items-center p-4 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} ${itemBgClass} overflow-hidden relative`}>
            
            {/* Shimmer Effect Overlay */}
            <div className={`absolute inset-0 ${shimmerClass}`}></div>

            {/* Checkbox Skeleton */}
            <div className={`w-5 h-5 rounded-md shrink-0 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            
            {/* Task Details Skeleton */}
            <div className="flex-grow min-w-0 mx-3 space-y-2">
                {/* Title Skeleton */}
                <div className={`h-4 w-4/5 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                
                {/* Meta Data Skeleton (Priority & Date) */}
                <div className="flex items-center space-x-3 text-xs">
                    {/* Priority Tag Skeleton */}
                    <div className={`h-3 w-12 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                    {/* Due Date Skeleton */}
                    <div className={`h-3 w-16 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                </div>
            </div>
            
            {/* Action Menu (MoreVertical) Skeleton */}
            <div className={`w-5 h-5 rounded-full shrink-0 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
        </div>
    );
};

// --- Komponen Utama Loading Skeleton ---

interface LoadingStateProps {
    isDarkMode: boolean;
    count?: number; // Jumlah item skeleton yang akan ditampilkan
}

/**
 * Komponen LoadingState yang menampilkan efek Skeleton Loader.
 * Digunakan saat data sedang diambil dari Firestore.
 */
const LoadingState: React.FC<LoadingStateProps> = ({ isDarkMode, count = 4 }) => {
    return (
        <>
            {/* Gaya untuk Shimmer Effect */}
            <style jsx global>{`
                @keyframes loading-shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .shimmer-light:before, .shimmer-dark:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
                    animation: loading-shimmer 1.5s infinite;
                }
                
                .shimmer-dark:before {
                    background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
                }
            `}</style>
            
            <div className="space-y-3 mt-4">
                {Array.from({ length: count }).map((_, index) => (
                    <SkeletonItem key={index} isDarkMode={isDarkMode} />
                ))}
            </div>
        </>
    );
};

export default LoadingState;
