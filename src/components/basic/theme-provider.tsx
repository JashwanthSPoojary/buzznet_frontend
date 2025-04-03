import { useThemeStore } from '@/store/slices/theme-store';
import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'landing-theme',
}: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();
  
  // Set default theme on mount if not already set
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark' | 'system');
    } else if (defaultTheme) {
      setTheme(defaultTheme);
      localStorage.setItem(storageKey, defaultTheme);
    }
  }, [defaultTheme, setTheme, storageKey]);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  return <>{children}</>;
}
