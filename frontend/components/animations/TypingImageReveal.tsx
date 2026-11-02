'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TypingImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const TypingImageReveal: React.FC<TypingImageRevealProps> = ({
  children,
  delay = 0.5,
  duration = 1.2,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
      animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      transition={{
        duration,
        delay,
        ease: 'linear', // Linear ease looks best for typing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
