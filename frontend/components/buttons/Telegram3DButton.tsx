'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export const Telegram3DButton: React.FC = () => {
  return (
    <a
      href="https://t.me/arghyyahelp"
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-[#0088cc] dark:bg-[#7bc0e3] rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm border border-[#0088cc]/20 dark:border-[#7bc0e3]/50"
      aria-label="Connect on Telegram"
    >
      {/* Background traditional spinning mandala (subtle) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-4 -top-4 w-16 h-16 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px), radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)',
          backgroundSize: '10px 10px, 20px 20px',
        }}
      />

      {/* Futuristic scanning light sweep */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 dark:via-white/40 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Futuristic + Traditional Icon Container */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Spinning ornamental ring (Traditional) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-4px] border-[1px] border-dashed border-cream-50/50 dark:border-black/30 rounded-full"
        />
        {/* Airplane Icon (Modern) */}
        <motion.div
          whileHover={{ x: 3, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-cream-50 dark:text-black"
        >
          <Send size={18} className="fill-current" />
        </motion.div>
      </div>

      {/* Button Text */}
      <span className="relative z-10 text-cream-50 dark:text-black font-bold tracking-wide text-xs sm:text-sm drop-shadow-sm">
        CONNECT ON TELEGRAM
      </span>
    </a>
  );
};
