import React from 'react';
import Loader from '../loader/Loader';

// Definisi props menggunakan React.ComponentPropsWithoutRef
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  ...props
}: ButtonProps) => {
  // Base style yang lebih modern, shadow, dan efek klik
  const baseStyle = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-300 transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    // Primary: Biru, ada shadow
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/50',
    // Danger: Merah, ada shadow
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/50',
    // Ghost: Transparan, cocok untuk dark mode
    ghost: 'bg-transparent text-gray-400 hover:bg-gray-700 border border-gray-700',
  };

  const loaderColor = variant === 'primary' || variant === 'danger' ? 'white' : 'blue';

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {/* Loader diatur ukurannya dan warnanya secara terprogram */}
      {isLoading 
        ? <Loader className="!h-4 !w-4" color={loaderColor} /> 
        : children}
    </button>
  );
};

export default Button;
