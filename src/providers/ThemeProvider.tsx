// src/providers/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // <-- Perbaikan ada di baris ini

// Buat context baru untuk tema
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Hook kustom untuk menggunakan context tema
export const useTheme = () => useContext(ThemeContext);

// Komponen provider
// Perbaiki baris ini: tambahkan tipe ReactNode untuk children
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Efek untuk menyimpan preferensi tema ke localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};