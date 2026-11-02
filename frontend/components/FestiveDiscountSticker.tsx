'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FestiveDiscountStickerProps {
  /** Position variant — 'right' (default) or 'bottom' */
  position?: 'right' | 'bottom';
  /** Extra className on the wrapper */
  className?: string;
}

/**
 * FestiveDiscountSticker
 * Animated festive-sale badge that floats and pulses.
 * Rendered at the right / bottom of every product catalogue section.
 */
export const FestiveDiscountSticker: React.FC<FestiveDiscountStickerProps> = ({
  position = 'right',
  className = '',
}) => {
  return (
    <motion.div
      /* Entry animation */
      initial={{ opacity: 0, scale: 0.6, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
      /* Hover lift */
      whileHover={{ scale: 1.02 }}
      className={`relative select-none flex items-center justify-center overflow-hidden rounded-lg shadow-lg border border-amber-900/10 ${
        position === 'right'
          ? 'self-center md:self-start mt-4 md:mt-8 shrink-0 w-[240px] md:w-[280px]'
          : 'w-full max-w-md mx-auto mt-6'
      } ${className}`}
      style={{
        zIndex: 20,
        aspectRatio: '4/1',
        background: '#fdf6ed', // Warm beige background matching image
      }}
      aria-label="Festive Season Sale — Upto 60% Off"
    >
      {/* Outer glow pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: '0 0 20px rgba(168, 38, 65, 0.2)',
        }}
      />

      {/* Content wrapper */}
      <div className="flex w-full h-full items-center justify-between px-3 md:px-5 relative z-10">
        
        {/* Left side text: Festive Season */}
        <div className="flex flex-col items-start justify-center text-amber-900 leading-none">
          <span className="font-serif italic text-lg md:text-xl font-medium tracking-wide">Festive</span>
          <span className="font-serif italic text-xl md:text-2xl font-semibold tracking-wide ml-2">Season</span>
        </div>

        {/* Right side text: UPTO 60% OFF */}
        <div className="flex items-center text-[#a82641]">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider mr-1 mt-1 text-gray-700">Upto</span>
          <span className="text-3xl md:text-4xl font-bold leading-none tracking-tighter">60<span className="text-lg md:text-xl">%</span></span>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider ml-1 mt-auto mb-1 text-gray-700">Off</span>
        </div>

      </div>

      {/* Shimmer sweep overlay */}
      <motion.div
        animate={{ x: ['-120%', '120%'] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', repeatDelay: 1.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 12 }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '40%',
            height: '100%',
            background:
              'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
            transform: 'skewX(-18deg)',
          }}
        />
      </motion.div>

    </motion.div>
  );
};
