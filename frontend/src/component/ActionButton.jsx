import React from 'react';

const ActionButton = ({ 
  icon: Icon, 
  text, 
  onClick, 
  variant = 'text',
  className = '' 
}) => {
  
 
  const baseStyles = "flex items-center justify-center gap-1.5 text-xs font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1";
  
 
  const variants = {
    
    text: "text-rose-400 hover:text-rose-500 bg-transparent px-1 py-1",
    
    
    outline: "border border-rose-200 text-rose-400 bg-white hover:bg-rose-50/50 px-3 py-1.5 shadow-sm"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className={`${variant === 'text' ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />}
      <span>{text}</span>
    </button>
  );
};

export default ActionButton;