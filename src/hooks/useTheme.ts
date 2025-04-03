import { useThemeStore } from "@/store/slices/theme-store";
import { useEffect } from "react";

export const useTheme = () => {
    const { theme, setTheme } = useThemeStore();
    
    // Update the class on the document element whenever the theme changes
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
    
    return { theme, setTheme };
  };