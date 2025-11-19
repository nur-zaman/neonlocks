import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-mono font-bold transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden rounded-sm";
  
  const variants = {
    primary: "bg-neon-blue text-neon-dark hover:bg-white hover:text-neon-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]",
    secondary: "border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESSING...
        </span>
      ) : (
        <span className="flex items-center gap-2 z-10">
          {icon}
          {children}
        </span>
      )}
      {/* Button Glitch Effect Overlay */}
      <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12 origin-bottom-left pointer-events-none"></div>
    </button>
  );
};
