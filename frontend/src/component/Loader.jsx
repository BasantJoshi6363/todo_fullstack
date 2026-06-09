import React from 'react';

const Loader = ({ variant = 'spinner', size = 'md', color = 'text-rose-500', text }) => {
  // Size mappings for different styles
  const sizes = {
    sm: { spinner: 'h-5 w-5 border-2', dots: 'h-1.5 w-1.5', bar: 'h-1 w-24' },
    md: { spinner: 'h-10 w-10 border-4', dots: 'h-3 w-3', bar: 'h-2 w-48' },
    lg: { spinner: 'h-16 w-16 border-4', dots: 'h-4 w-4', bar: 'h-3 w-64' },
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 1. Classic Circular Spinner */}
      {variant === 'spinner' && (
        <div
          className={`${sizes[size].spinner} animate-spin rounded-full border-t-transparent border-current ${color}`}
          role="status"
        />
      )}

      {/* 2. Bouncing Dots */}
      {variant === 'dots' && (
        <div className="flex space-x-2 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className={`${sizes[size].dots} bg-current ${color} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
          <div className={`${sizes[size].dots} bg-current ${color} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
          <div className={`${sizes[size].dots} bg-current ${color} rounded-full animate-bounce`}></div>
        </div>
      )}

      {/* 3. Infinite Progress Bar */}
      {variant === 'bar' && (
        <div className={`${sizes[size].bar} bg-gray-200 rounded-full overflow-hidden relative`}>
          <div className={`h-full bg-current ${color} rounded-full absolute top-0 left-0 animate-[shimmer_1.5s_infinite] w-1/2`} 
               style={{ animationName: 'shimmer' }}
          />
        </div>
      )}

      {/* Optional Loading Text */}
      {text && (
        <p className={`mt-3 text-sm font-medium tracking-wide animate-pulse text-gray-600`}>
          {text}
        </p>
      )}

      {/* Micro-animation configuration for the bar variant if not already in tailwind.config */}
      {variant === 'bar' && (
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      )}
    </div>
  );
};

export default Loader;