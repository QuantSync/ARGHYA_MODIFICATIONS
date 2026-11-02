'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PopFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const PopFade: React.FC<PopFadeProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a professional pop
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
