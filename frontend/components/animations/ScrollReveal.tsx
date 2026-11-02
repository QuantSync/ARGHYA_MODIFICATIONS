'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 'up' fades in from below, 'down' from above, 'left', 'right', or 'none' for pure fade */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Spring stiffness — higher = snappier. Default 240. */
  stiffness?: number;
  /** Spring damping — higher = less bounce. Default 26. */
  damping?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  stiffness = 240,
  damping = 26,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
      x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        type: 'spring',
        stiffness,
        damping,
        mass: 1,
        delay,
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
