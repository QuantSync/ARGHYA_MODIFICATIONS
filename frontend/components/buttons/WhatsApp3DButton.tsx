'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsApp3DButtonProps {
  onClick?: () => void;
}

export const WhatsApp3DButton: React.FC<WhatsApp3DButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] dark:bg-[#25D366] dark:hover:bg-[#20ba5a] text-stone-950 font-bold rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-md border border-[#25D366]/40 dark:border-[#25D366]/60 select-none"
      aria-label="Connect on WhatsApp"
    >
      {/* Subtle spinning background ornament */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-4 -top-4 w-16 h-16 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px), radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)',
          backgroundSize: '10px 10px, 20px 20px',
        }}
      />

      {/* Futuristic scanning light streak */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Icon Container with Spinning Dash Ring */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-4px] border-[1px] border-dashed border-stone-950/40 rounded-full"
        />
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-stone-950"
        >
          <MessageCircle size={18} className="fill-stone-950 text-[#25D366]" />
        </motion.div>
      </div>

      {/* Button Text */}
      <span className="relative z-10 text-stone-950 font-extrabold tracking-wide text-xs sm:text-sm drop-shadow-sm uppercase">
        CONNECT ON WHATSAPP
      </span>
    </button>
  );
};
