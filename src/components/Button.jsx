import React from 'react';
import { cn } from '../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}, ref) => {
  // Visual variants for different semantic meanings
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm focus-visible:ring-primary-500',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-500',
    outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-50 text-neutral-700 focus-visible:ring-neutral-500',
    ghost: 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-500',
  };

  // Size presets so buttons stay consistent across the app
  const sizes = {
    sm: 'h-8 px-4 text-xs min-w-[80px]',
    md: 'h-10 px-5 text-sm min-w-[100px]', // Reduced height slightly, explicit text-sm, adjusted padding
    lg: 'h-12 px-8 text-base min-w-[140px]',
    icon: 'h-10 w-10 p-2', 
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      // If isLoading is true we also block extra clicks
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
