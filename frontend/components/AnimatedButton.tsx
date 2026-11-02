'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  let baseStyles = 'px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 select-none cursor-pointer';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-burgundy-800 dark:bg-amber-500 text-cream-50 dark:text-stone-950 hover:bg-burgundy-900 dark:hover:bg-amber-400';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-cream-200 dark:bg-stone-800 text-burgundy-900 dark:text-stone-100 hover:bg-cream-300 dark:hover:bg-stone-700';
  } else if (variant === 'outline') {
    variantStyles = 'border border-burgundy-800/40 dark:border-amber-500/40 text-burgundy-900 dark:text-amber-300 hover:bg-burgundy-800/10 dark:hover:bg-amber-500/10';
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${variantStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};
