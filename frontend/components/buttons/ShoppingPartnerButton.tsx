'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ShoppingPartnerButtonProps {
  className?: string;
}

/**
 * "Your Shopping Partner" hero badge button.
 * Transparent / frosted-glass background with a warm golden border.
 * Works beautifully in both light (maroon bg) and dark (deep-black bg) hero sections.
 */
export const ShoppingPartnerButton: React.FC<ShoppingPartnerButtonProps> = ({ className = '' }) => {
  return (
    <Link href="/products" className="inline-block relative focus:outline-none">
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
        className={`relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full
          /* Transparent frosted-glass fill */
          bg-white/10 dark:bg-white/5 backdrop-blur-md
          /* Gold border that reads well on both themes */
          border border-amber-400/60 dark:border-amber-500/50
          /* Subtle inset shadow adds depth */
          shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_12px_rgba(212,175,55,0.18)]
          /* Typography */
          text-amber-100 dark:text-amber-200 font-mono text-xs uppercase tracking-[0.22em] font-semibold
          /* Hover glow */
          hover:bg-amber-500/15 dark:hover:bg-amber-500/10
          hover:border-amber-400/90 dark:hover:border-amber-400/70
          hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_rgba(212,175,55,0.32)]
          transition-all duration-300 cursor-pointer ${className}`}
      >
        {/* Sparkle icon */}
        <span className="text-amber-300 dark:text-amber-400 text-sm leading-none select-none">✦</span>
        <span className="select-none">Your Shopping Partner</span>
      </motion.div>
    </Link>
  );
};
