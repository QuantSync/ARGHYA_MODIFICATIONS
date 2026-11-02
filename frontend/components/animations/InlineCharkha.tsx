'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InlineCharkhaProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Inline Charkha Animation
 * Displays a moving 20-spoke wheel.
 * Pinkish-maroon in light theme, golden in dark theme.
 * Used alongside text as an inline element.
 */
export const InlineCharkha: React.FC<InlineCharkhaProps> = ({ className = '', size = 'md' }) => {
  // Create 20 spokes
  const spokes = Array.from({ length: 20 }, (_, i) => i);

  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
  };

  const dotClasses = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5',
    lg: 'w-2 h-2',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      className={`relative rounded-full border-burgundy-600 dark:border-amber-400 flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {/* Center dot */}
      <div className={`absolute rounded-full bg-burgundy-600 dark:bg-amber-400 z-10 ${dotClasses[size]}`} />

      {/* Spokes */}
      {spokes.map((i) => (
        <div
          key={i}
          className="absolute w-full h-[1.5px] bg-burgundy-600/80 dark:bg-amber-400/80"
          style={{
            transform: `rotate(${i * (360 / 20)}deg)`,
          }}
        />
      ))}
    </motion.div>
  );
};
