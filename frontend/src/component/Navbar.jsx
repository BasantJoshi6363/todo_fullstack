import React, { useState } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToogle';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Login', href: '/signup' },
    { name: 'Signup', href: '/signup' },
    
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-slate-50/80 border-slate-200/80 dark:bg-dark-bg/80 dark:border-dark-border/80 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white tracking-tight">
            <Layers size={20} className="text-indigo-600 dark:text-indigo-400" />
            <h3><span>Task</span>Planner</h3>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Area (Toggle Button + Mobile Menu) */}
          <div className="flex items-center gap-4">
            {/* Elegant Theme Toggle sits here */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl md:hidden text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-slate-50 border-b border-slate-200 dark:bg-dark-bg dark:border-dark-border transition-colors">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-surface dark:hover:text-slate-100 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}