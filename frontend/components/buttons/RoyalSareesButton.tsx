'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const RoyalSareesButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <Link href="/products?category=Saree" className="inline-block relative">
      <motion.div whileHover="hover" whileTap="tap" initial="initial" className="relative group rounded-xl p-[2px]">
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-[2px] rounded-xl bg-[conic-gradient(from_0deg,#731C24,#D4AF37,#3D0C11,#731C24)] dark:bg-[conic-gradient(from_0deg,#F59E0B,#D4AF37,#E6C280,#F59E0B)] opacity-70 group-hover:opacity-100 blur-[4px] transition-opacity pointer-events-none"
        />
        <motion.div
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.06, y: -3, transition: { type: 'spring', stiffness: 350, damping: 18 } },
            tap: { scale: 0.95, y: 0 },
          }}
          className={`relative z-10 rounded-xl px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center justify-center bg-white/90 hover:bg-white text-burgundy-900 border border-white/30 dark:bg-stone-950/80 dark:hover:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/50 ${className}`}
        >
          <span>ROYAL SAREES</span>
        </motion.div>
      </motion.div>
    </Link>
  );
};
