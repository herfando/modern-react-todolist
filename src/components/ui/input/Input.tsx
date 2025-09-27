import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          w-full p-4 bg-gray-800 border border-gray-700 rounded-lg 
          text-white placeholder-gray-500 focus:outline-none focus:ring-2 
          focus:ring-blue-600 focus:border-blue-600 transition-all duration-200
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