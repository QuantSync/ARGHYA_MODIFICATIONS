'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CircularThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <>
      {/* Circular Mask Ripple Backdrop Animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0.8 }}
            animate={{ clipPath: 'circle(150% at 50% 50%)', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 pointer-events-none bg-neutral-900 dark:bg-white"
          />
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.85, rotate: -30 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        onClick={handleClick}
        aria-label="Toggle Theme"
        className="relative p-2 rounded-full text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer select-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.25 }}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};
