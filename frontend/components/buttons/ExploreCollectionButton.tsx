'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ExploreCollectionButtonProps {
  className?: string;
}

export const ExploreCollectionButton: React.FC<ExploreCollectionButtonProps> = ({ className = '' }) => {
  return (
    <Link href="/products" className="inline-block relative">
      <motion.div
        whileHover="hover"
        whileTap="tap"
        initial="initial"
        className="relative group rounded-xl p-[2px] transition-all"
      >
        {/* Continuous Cyclic Border Glow Halo (Rotates continuously) */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-[2px] rounded-xl bg-[conic-gradient(from_0deg,#3D0C11,#731C24,#D4AF37,#3D0C11)] dark:bg-[conic-gradient(from_0deg,#D4AF37,#F59E0B,#FFF8F0,#D4AF37)] opacity-80 group-hover:opacity-100 blur-[4px] transition-opacity pointer-events-none"
        />

        {/* Bulging & Glowing Inner Button: White in Light Mode, Gold in Dark Mode */}
        <motion.div
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.06, y: -3, transition: { type: 'spring', stiffness: 350, damping: 18 } },
            tap: { scale: 0.95, y: 0 },
          }}
          className={`relative z-10 rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center
            /* Light Theme: Clean White Button with Deep Burgundy Text */
            bg-white hover:bg-cream-50 text-burgundy-900 border border-burgundy-800/10
            /* Dark Theme: Vibrant Warm Gold Button with Black Text */
            dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 dark:border-amber-400/30 ${className}`}
        >
          <span>EXPLORE COLLECTION</span>
        </motion.div>
      </motion.div>
    </Link>
  );
};
