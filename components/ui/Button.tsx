import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-opacity-90 hover:-translate-y-0.5 shadow-lg shadow-accent/20 focus:ring-accent',
    secondary: 'bg-primary text-white hover:bg-opacity-90 hover:-translate-y-0.5 shadow-lg shadow-primary/20 focus:ring-primary',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm focus:ring-white/50',
    ghost: 'text-primary hover:bg-primary/5 focus:ring-primary/50',
    white: 'bg-white text-primary border border-transparent hover:border-gray-200 hover:-translate-y-0.5 shadow-md focus:ring-white',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
