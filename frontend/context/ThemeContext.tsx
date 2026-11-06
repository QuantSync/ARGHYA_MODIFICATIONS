'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ComingSoonModal } from '../components/modals/ComingSoonModal';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  openThemeComingSoon: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Website always runs in white/light theme only
  const [theme] = useState<Theme>('light');
  const [isThemeComingSoonOpen, setIsThemeComingSoonOpen] = useState(false);

  useEffect(() => {
    // Ensure document root never has dark class and clear legacy theme
    const root = document.documentElement;
    root.classList.remove('dark');
    try {
      localStorage.setItem('arghya_theme', 'light');
    } catch {
      // ignore in incognito or restricted mode
    }
  }, []);

  const toggleTheme = () => {
    // Dark theme does not happen; rather blocked by Coming Soon card
    setIsThemeComingSoonOpen(true);
  };

  const openThemeComingSoon = () => {
    setIsThemeComingSoonOpen(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, openThemeComingSoon }}>
      {children}
      {/* Universal Coming Soon Card whenever Dark Theme is clicked anywhere */}
      <ComingSoonModal
        isOpen={isThemeComingSoonOpen}
        onClose={() => setIsThemeComingSoonOpen(false)}
        title={
          <>
            Dark Mode <span className="italic text-burgundy-700">Coming Soon</span>
          </>
        }
        description="Our night mode experience is being perfected with care. The website currently runs in premium white theme only."
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
