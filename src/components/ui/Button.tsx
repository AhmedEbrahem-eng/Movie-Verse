import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = "rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500",
    accent: "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5 space-x-1.5",
    md: "text-base px-4 py-2 space-x-2",
    lg: "text-lg px-6 py-3 space-x-3",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;