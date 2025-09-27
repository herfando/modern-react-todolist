// src/components/ui/button/Button.tsx (FINAL & STABLE CODE)
import React from 'react';
import Loader from '../loader/Loader';

// Definisi props menggunakan React.ComponentPropsWithoutRef
// Ini adalah cara paling aman untuk mendefinisikan props komponen wrapper
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

// Komponen Button ditulis sebagai fungsi biasa, bukan React.FC
// Ini menghindari beberapa masalah ketik yang kadang muncul pada React.FC
const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-transparent text-gray-400 hover:bg-gray-800',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader className="!h-4 !w-4 !border-t-white !border-b-white" /> : children}
    </button>
  );
};

export default Button;