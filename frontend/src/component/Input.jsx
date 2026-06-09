
import React, { useId } from 'react';

export default function Input({ label, error, className = '', ...props }) {
  const id = useId();

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={id}
          // Spreading props lets you pass: type, placeholder, value, onChange, disabled, maxLength, etc.
          {...props} 
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-dark-surface/50 text-slate-900 dark:text-slate-100 transition-all duration-200 outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error 
              ? 'border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500' 
              : 'border-slate-200 dark:border-dark-border focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10'
            }`}
        />
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
}
