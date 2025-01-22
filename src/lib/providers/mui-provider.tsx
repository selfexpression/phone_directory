'use client';

import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeContext } from '../context';
import { lightTheme, darkTheme } from '../theme';

type ThemeType = 'light' | 'dark';
export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storedTheme = localStorage.getItem('theme') as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(storedTheme || 'light');

  useEffect(() => {
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storedTheme]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
