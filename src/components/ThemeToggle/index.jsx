import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { IconButton } from '@mui/material';

const ThemeToggle = () => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {mode === 'light' ? '🌙' : '☀️'}
    </IconButton>
  );
};

export default ThemeToggle;
