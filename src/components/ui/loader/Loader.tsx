import React from 'react';

interface LoaderProps {
  className?: string;
  // Warna defaultnya biru, bisa diubah (digunakan untuk tombol primer)
  color?: 'blue' | 'white'; 
}

const Loader: React.FC<LoaderProps> = ({ className = '', color = 'blue' }) => {
  
  // Mengatur warna border berdasarkan prop 'color'
  const colorClasses = color === 'white' 
    ? "border-t-white border-b-white" 
    : "border-t-blue-600 border-b-blue-600";

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`
          animate-spin rounded-full 
          h-full w-full 
          border-2 
          ${colorClasses}
        `}
      ></div>
    </div>
  );
};

export default Loader;
