import React from 'react';

// Props yang fleksibel dan terketik (Kriteria Reusable Components & Props Handling)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false,
  className = '',
  ...props 
}) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {/* Kriteria Conditional Rendering */}
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

export default Button;