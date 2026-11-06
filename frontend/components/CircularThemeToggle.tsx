'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CircularThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();

  const handleClick = () => {
    // Blocks dark theme and triggers Coming Soon card
    toggleTheme();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.15, rotate: 15 }}
      whileTap={{ scale: 0.85, rotate: -30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      onClick={handleClick}
      aria-label="Dark theme (Coming Soon)"
      title="Dark theme (Coming Soon)"
      className="relative p-2 rounded-full text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer select-none"
    >
      <Moon size={19} />
    </motion.button>
  );
};
