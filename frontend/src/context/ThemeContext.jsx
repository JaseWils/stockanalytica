import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to 'dark'
    const savedTheme = localStorage.getItem('stockanalytica-theme');
    return savedTheme || 'dark';
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('stockanalytica-theme', theme);
    
    // Update document class for global CSS access
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement. classList.remove('light');
    } else {
      document. documentElement.classList. add('light');
      document.documentElement. classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (! context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;