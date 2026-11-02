'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CharkhaLoaderProps {
  isVisible: boolean;
}

/**
 * Full screen Charkha Navigation Transition Loader
 * Displays a sleek pure black backdrop with backdrop blur and a moving 20-spoke wheel.
 * Appears with smooth fade-in and disappears with fade-out.
 */
export const CharkhaLoader: React.FC<CharkhaLoaderProps> = ({ isVisible }) => {
  // Create 20 spokes
  const spokes = Array.from({ length: 20 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="charkha-navigation-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl text-cream-50"
        >
          {/* Wheel Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[3px] border-amber-400 dark:border-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.3)]"
            >
              {/* Center dot */}
              <div className="absolute w-3 h-3 rounded-full bg-amber-400 z-10 shadow-[0_0_10px_#fbbf24]" />

              {/* Spokes */}
              {spokes.map((i) => (
                <div
                  key={i}
                  className="absolute w-full h-[2px] bg-gradient-to-r from-amber-400/20 via-amber-400/90 to-amber-400/20"
                  style={{
                    transform: `rotate(${i * (360 / 20)}deg)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ARGHYA Brand Text Below Loader */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="mt-6 flex flex-col items-center space-y-1 select-none"
          >
            <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.25em] text-amber-300">
              ARGHYA
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
              SLAY EVERYDAY
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
