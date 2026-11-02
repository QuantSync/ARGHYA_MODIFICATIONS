'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuyCODButtonProps {
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** delay (seconds) before the fade-in animation starts */
  fadeDelay?: number;
}

/**
 * BuyCODButton
 * ─────────────────────────────────────────────────────────────────
 * A premium "Buy · Cash On Delivery" button with:
 *  • Fade-in entrance animation (configurable delay)
 *  • Bulge / spring scale animation on hover
 *  • Press-to-invert colour: dark maroon ↔ cream/white
 *  • Light theme  → black text on maroon bg  (inverts to maroon text on cream bg)
 *  • Dark theme   → white text on dark-maroon (inverts to dark-maroon text on cream bg)
 *  • Colour matches the #1C0508 swatch provided by the user
 * ─────────────────────────────────────────────────────────────────
 */
export const BuyCODButton: React.FC<BuyCODButtonProps> = ({
  onClick,
  className = '',
  size = 'md',
  fadeDelay = 0,
}) => {
  const [pressed, setPressed] = useState(false);

  const sizeMap = {
    sm: 'px-3.5 py-1.5 text-[10px] gap-1.5',
    md: 'px-6 py-2.5 text-xs gap-2',
    lg: 'px-8 py-3 text-xs gap-2',
  };

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        id="buy-cod-btn"
        aria-label="Buy Cash On Delivery"
        /* Fade-in entrance */
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: fadeDelay,
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        /* Bulge / spring hover and tap */
        whileHover={{
          scale: 1.06,
          y: -3,
          transition: { type: 'spring', stiffness: 380, damping: 18 },
        }}
        whileTap={{
          scale: 0.94,
          y: 0,
          transition: { duration: 0.08 },
        }}
        /* Press-to-invert via state */
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        onClick={onClick}
        style={{
          backgroundColor: pressed ? '#FAF4EC' : '#2A0A10',
          borderColor: '#2A0A10',
        }}
        className={[
          'relative inline-flex items-center justify-center',
          'rounded-xl font-bold uppercase tracking-wider select-none cursor-pointer',
          'border-2 shadow-lg',
          'transition-colors duration-150',
          sizeMap[size],
          'text-white',
          'shadow-[0_4px_18px_rgba(44,8,16,0.45)]',
          'dark:shadow-[0_4px_18px_rgba(28,5,8,0.65)]',
          className,
        ].join(' ')}
      >
        {/* Subtle inner sheen */}
        <span
          aria-hidden="true"
          className={[
            'absolute inset-0 rounded-xl pointer-events-none',
            'bg-gradient-to-br from-white/10 via-transparent to-black/20',
            pressed ? 'opacity-0' : 'opacity-100',
            'transition-opacity duration-150',
          ].join(' ')}
        />

        {/* COD icon */}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={size === 'sm' ? 'w-3 h-3 shrink-0' : size === 'lg' ? 'w-5 h-5 shrink-0' : 'w-4 h-4 shrink-0'}
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>

        <span className="relative z-10 leading-none">
          Buy &bull; Cash On Delivery
        </span>
      </motion.button>
    </AnimatePresence>
  );
};
