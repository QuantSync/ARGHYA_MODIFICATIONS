'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BorderGlowWidgetProps {
  children: React.ReactNode;
  className?: string;
  roundedClassName?: string;
}

export const BorderGlowWidget: React.FC<BorderGlowWidgetProps> = ({
  children,
  className = '',
  roundedClassName = 'rounded-2xl',
}) => {
  return (
    <motion.div
      whileHover="glowHover"
      initial="initial"
      className={`relative group ${roundedClassName} ${className}`}
    >
      {/* Animated Lighting Glow Background Ring */}
      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.98 },
          glowHover: { opacity: 1, scale: 1.01 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`absolute -inset-[1.5px] ${roundedClassName} bg-gradient-to-r from-burgundy-800 via-burgundy-600 to-burgundy-900 dark:from-amber-400 dark:via-yellow-200 dark:to-amber-500 blur-[3px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-0`}
      />

      {/* Content Container (Prevents Pixel Overflow & Render Layout Shift) */}
      <div className={`relative z-10 ${roundedClassName} h-full overflow-hidden`}>
        {children}
      </div>
    </motion.div>
  );
};
