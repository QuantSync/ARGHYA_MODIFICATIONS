'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollZoomInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the zoom animation starts. Default 0.4 */
  delay?: number;
  /** Duration of the zoom animation. Default 0.5 */
  duration?: number;
}

/**
 * Wraps children in a zoom-in effect that triggers when the element
 * scrolls into view. Scales from 0 → 1 with a bouncy spring.
 */
export const ScrollZoomIn: React.FC<ScrollZoomInProps> = ({
  children,
  className = '',
  delay = 0.4,
  duration = 0.5,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration,
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  );
};
