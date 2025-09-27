import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Props tambahan untuk styling
  isDarkMode?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', isDarkMode, ...props }, ref) => {
    
    // Kelas default untuk dark mode (karena itu yang paling umum di halaman auth Anda)
    const darkClasses = `
      bg-gray-800 border-gray-700 text-white placeholder-gray-500 
      focus:ring-blue-500 focus:border-blue-500
    `;

    // Kelas untuk light mode (jika perlu digunakan secara eksplisit)
    const lightClasses = `
      bg-white border-gray-300 text-gray-900 placeholder-gray-400 
      focus:ring-blue-600 focus:border-blue-600
    `;

    const dynamicClasses = isDarkMode === false ? lightClasses : darkClasses; // Default ke dark jika isDarkMode tidak disetel
    
    return (
      <input
        type={type}
        className={`
          w-full p-3 border rounded-xl focus:outline-none focus:ring-2 
          transition-all duration-200 text-sm 
          ${dynamicClasses}
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
