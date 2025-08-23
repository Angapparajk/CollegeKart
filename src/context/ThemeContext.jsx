import React, { createContext, useState, useMemo } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  primary: '#a9251d',
  secondary: '#0a73b0',
  background: '#fff',
  text: '#222',
};

const darkTheme = {
  primary: '#22223b',
  secondary: '#4a4e69',
  background: '#000',
  text: '#fff',
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
