import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "px-5 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors duration-200 inline-flex items-center justify-center gap-2 outline-none focus:ring-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 focus:ring-indigo-500/20",
    secondary: "bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface dark:hover:bg-dark-border text-slate-800 dark:text-slate-200 border border-transparent dark:border-dark-border focus:ring-slate-500/10",
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500/20"
  };

  return (
    <motion.button
      whileHover={{ scale: props.disabled ? 1 : 1.015 }}
      whileTap={{ scale: props.disabled ? 1 : 0.985 }}
      {...props} // Spreads onClick, type="submit", disabled, data-* attributes, etc.
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}