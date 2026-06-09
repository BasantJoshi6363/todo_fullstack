import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-surface dark:hover:bg-dark-border border border-transparent dark:border-dark-border transition-colors duration-200 overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: 40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: -40 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} // Elegant spring curve
          className="text-amber-500 dark:text-indigo-400"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}