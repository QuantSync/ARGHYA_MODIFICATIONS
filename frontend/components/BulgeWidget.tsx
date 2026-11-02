'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BulgeWidgetProps {
  children: React.ReactNode;
  className?: string;
  scaleHover?: number;
  liftY?: number;
  onClick?: () => void;
}

export const BulgeWidget: React.FC<BulgeWidgetProps> = ({
  children,
  className = '',
  scaleHover = 1.03,
  liftY = -5,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        scale: scaleHover,
        y: liftY,
        transition: { type: 'spring', stiffness: 350, damping: 20 },
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
        transition: { duration: 0.1 },
      }}
      className={`relative cursor-pointer transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
