import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-300 
        ${isDark 
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700' 
          :  'bg-gray-100 hover: bg-gray-200 text-slate-700 border border-gray-300'
        }
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun 
          className={`
            absolute inset-0 transform transition-all duration-300
            ${isDark ?  'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
          `} 
          size={20} 
        />
        {/* Moon icon */}
        <Moon 
          className={`
            absolute inset-0 transform transition-all duration-300
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}
          `} 
          size={20} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;