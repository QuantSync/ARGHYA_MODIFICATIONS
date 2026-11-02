'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface FestiveSalePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * FestiveSalePopupModal
 * ─────────────────────────────────────────────────────────────────
 * A promotional pop-up banner that appears when the user visits the home page.
 * • Blurred backdrop
 * • Professional Indian / modern styling
 * • Theme-aware (light/dark)
 * • Centered via inline transforms (no pixel overflow)
 * • Spring entrance / exit animation
 * ─────────────────────────────────────────────────────────────────
 */
/* ─── Smooth spring presets ─── */
const BACKDROP_TRANSITION = { duration: 0.28, ease: [0.32, 0, 0.67, 0] };
const CARD_SPRING = { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.9 };
const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
  },
};
const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 340, damping: 28 } },
};

export const FestiveSalePopupModal: React.FC<FestiveSalePopupModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shouldReduceMotion = useReducedMotion();
  /* ── ESC to close ── */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Blurred backdrop ── */}
          <motion.div
            key="festive-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={BACKDROP_TRANSITION}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
            style={{ willChange: 'opacity' }}
            aria-hidden="true"
            onClick={onClose}
          />

          {/* ── Modal card ── */}
          <motion.div
            key="festive-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="festive-modal-title"
            /* Butter-smooth spring entrance */
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.80, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.90, y: 16 }}
            transition={CARD_SPRING}
            /* Centering via inline style to prevent Tailwind translate conflicts */
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              zIndex: 9999,
              width: 'min(calc(100vw - 2.5rem), 480px)',
              willChange: 'transform, opacity',
            }}
            onClick={(e) => e.stopPropagation()}
            className={[
              'bg-[#FAF4EC] dark:bg-[#1A0A0D]',
              'border border-burgundy-800/15 dark:border-[#3D0C11]/80',
              'rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]',
              'overflow-hidden',
              'text-center',
            ].join(' ')}
          >
            {/* Top Pattern / Imagery Area */}
            <div className="relative h-44 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 dark:from-amber-600 dark:via-amber-500 dark:to-amber-700 overflow-hidden">
              {/* Subtle Indian-inspired mandala or geometric backdrop pattern using CSS radials */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sale banner"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Decorative Icon — slow spin + gentle pulse glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.08, 1],
                    filter: ['drop-shadow(0 0 8px rgba(251,191,36,0.55))', 'drop-shadow(0 0 22px rgba(251,191,36,0.9))', 'drop-shadow(0 0 8px rgba(251,191,36,0.55))'],
                  }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                    filter: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  style={{ willChange: 'transform, filter' }}
                >
                  <Sparkles size={56} className="text-amber-300 dark:text-stone-900" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>

            {/* Text Content — staggered cascade */}
            <motion.div
              className="p-8 sm:p-10 space-y-6"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={STAGGER_ITEM}>
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-burgundy-700 dark:text-amber-500 mb-2">
                  Limited Time
                </p>
                <h2
                  id="festive-modal-title"
                  className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900 dark:text-stone-100 leading-tight"
                >
                  The Festive Couture<br />Sale Event
                </h2>
              </motion.div>
              
              <motion.p variants={STAGGER_ITEM} className="text-sm text-burgundy-800/80 dark:text-stone-300 leading-relaxed max-w-sm mx-auto font-medium">
                Celebrate the season of joy with Arghya Collections. Step into the festivities with handwoven Navratri specials and vibrant ethnic wear.
              </motion.p>
              
              <motion.div variants={STAGGER_ITEM} className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(61,12,17,0.35)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={onClose}
                  className={[
                    'relative w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg border-none overflow-hidden',
                    'bg-burgundy-800 hover:bg-burgundy-900 text-cream-50',
                    'dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950',
                  ].join(' ')}
                  style={{ willChange: 'transform' }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    className="pointer-events-none absolute inset-0 block"
                    style={{
                      background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPositionX: ['-100%', '200%'] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
                  />
                  Explore Collection
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
