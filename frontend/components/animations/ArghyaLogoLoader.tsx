'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ArghyaLogoLoaderProps {
  isVisible: boolean;
}

/**
 * ArghyaLogoLoader — Full-screen branded loading/transition overlay.
 *
 * Light mode → cream background with dark maroon logo (/images/arghya_logo_light.jpg)
 * Dark mode  → pure black background with gold logo  (/images/arghya_logo_dark.jpg)
 *
 * The logo image fades in smoothly as a whole unit — clean, premium, no distractions.
 */
export const ArghyaLogoLoader: React.FC<ArghyaLogoLoaderProps> = ({ isVisible }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="arghya-logo-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed inset-0 z-[99999] flex items-center justify-center ${
            isDark ? 'bg-black' : 'bg-[#f0ebe4]'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(80vw,480px)] select-none pointer-events-none"
          >
            <Image
              src={isDark ? '/images/arghya_logo_dark.jpg' : '/images/arghya_logo_light.jpg'}
              alt="ARGHYA — Slay Everyday"
              width={960}
              height={540}
              priority
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
