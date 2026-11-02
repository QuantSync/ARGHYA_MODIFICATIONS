'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedClock: React.FC = () => {
  return (
    <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">

        {/* Ribbon left */}
        <motion.path d="M25 24 L18 46 L26 42 L32 52 L38 42 L46 46 L39 24"
          className="fill-burgundy-800/15 dark:fill-amber-400/15 stroke-burgundy-800 dark:stroke-amber-400"
          strokeWidth="1.5" strokeLinejoin="round"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        />

        {/* Medal circle */}
        <motion.circle cx="32" cy="22" r="17"
          className="fill-cream-100 dark:fill-stone-800 stroke-burgundy-800 dark:stroke-amber-400"
          strokeWidth="2.5"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.45, ease: 'backOut' }}
        />
        {/* Inner ring */}
        <motion.circle cx="32" cy="22" r="13"
          className="fill-white dark:fill-stone-900 stroke-burgundy-800/25 dark:stroke-amber-400/25"
          strokeWidth="1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        />

        {/* Hour tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const deg = i * 30;
          const rad = (deg * Math.PI) / 180;
          const isMain = i % 3 === 0;
          const r1 = isMain ? 10 : 11.5;
          return (
            <line key={i}
              x1={32 + r1 * Math.sin(rad)} y1={22 - r1 * Math.cos(rad)}
              x2={32 + 13 * Math.sin(rad)} y2={22 - 13 * Math.cos(rad)}
              strokeWidth={isMain ? 1.5 : 0.8}
              strokeLinecap="round"
              className="stroke-burgundy-800 dark:stroke-amber-400"
            />
          );
        })}

        {/* Center dot */}
        <circle cx="32" cy="22" r="1.8" className="fill-burgundy-800 dark:fill-amber-400" />

        {/* Hour hand */}
        <motion.line x1="32" y1="22" x2="32" y2="13"
          className="stroke-burgundy-900 dark:stroke-amber-300"
          strokeWidth="2.5" strokeLinecap="round"
          style={{ originX: '32px', originY: '22px' }}
          animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        {/* Minute hand */}
        <motion.line x1="32" y1="22" x2="32" y2="11"
          className="stroke-burgundy-800 dark:stroke-amber-400"
          strokeWidth="1.5" strokeLinecap="round"
          style={{ originX: '32px', originY: '22px' }}
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Second hand (red, very fast) */}
        <motion.line x1="32" y1="24" x2="32" y2="10"
          stroke="#e11d48" strokeWidth="1" strokeLinecap="round"
          style={{ originX: '32px', originY: '22px' }}
          animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />

        {/* Star emblem at ribbon bottom */}
        <motion.polygon
          points="32,44 33.8,49 39,49 34.9,52 36.5,57 32,54 27.5,57 29.1,52 25,49 30.2,49"
          className="fill-burgundy-800 dark:fill-amber-400"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, ease: 'backOut' }}
          style={{ originX: '32px', originY: '50px' }}
        />
      </svg>
    </div>
  );
};
