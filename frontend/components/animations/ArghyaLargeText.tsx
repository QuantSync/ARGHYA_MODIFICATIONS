'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const ArghyaLargeText: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const text = "ARGHYA";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.05,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 36, filter: 'blur(16px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 22,
        mass: 0.9,
      },
    }
  };

  return (
    <div ref={ref} className="w-full flex justify-center py-8 md:py-16 overflow-hidden">
      <motion.h1
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="font-serif text-[18vw] leading-none font-bold text-black dark:text-white tracking-tighter select-none"
        style={{ letterSpacing: '-0.02em', willChange: 'auto' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={item}
            className="inline-block"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};
