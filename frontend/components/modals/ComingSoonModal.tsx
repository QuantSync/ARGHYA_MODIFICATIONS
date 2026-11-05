'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose, title, description }) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            key="coming-soon-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99998] bg-stone-950/60 dark:bg-stone-950/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            key="coming-soon-modal"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none p-4"
          >
            <div
              className="relative pointer-events-auto w-full max-w-sm rounded-3xl
                         bg-cream-50/95 dark:bg-stone-950/95
                         border border-burgundy-800/20 dark:border-amber-500/25
                         shadow-2xl shadow-burgundy-900/20 dark:shadow-amber-500/10
                         overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy-800 via-amber-500 to-burgundy-800 dark:from-amber-600 dark:via-amber-400 dark:to-amber-600" />

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-full text-burgundy-800/50 dark:text-stone-400
                           hover:text-burgundy-900 dark:hover:text-amber-400
                           hover:bg-burgundy-800/10 dark:hover:bg-amber-500/10 transition-colors z-10"
              >
                <X size={18} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center px-8 pt-10 pb-10 space-y-5">
                {/* Animated sparkle icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  className="w-16 h-16 rounded-full
                             bg-gradient-to-br from-burgundy-100 to-amber-100
                             dark:from-burgundy-900/60 dark:to-amber-900/40
                             flex items-center justify-center
                             border border-burgundy-800/15 dark:border-amber-500/25
                             shadow-lg shadow-amber-500/10"
                >
                  <Sparkles className="w-7 h-7 text-burgundy-800 dark:text-amber-400" />
                </motion.div>

                {/* Brand label */}
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-burgundy-700/60 dark:text-amber-500/60 font-bold">
                  Arghya
                </span>

                {/* Headline */}
                <div className="space-y-1">
                  <h2 className="font-serif text-3xl font-bold text-burgundy-900 dark:text-stone-100 leading-tight">
                    {title || (
                      <>
                        Coming <span className="italic text-burgundy-700 dark:text-amber-400">Soon</span>
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-burgundy-800/60 dark:text-stone-400 leading-relaxed max-w-[220px] mx-auto">
                    {description || 'Our member portal is being crafted with care. Sign‑in will be live very soon.'}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-burgundy-800/30 dark:via-amber-500/30 to-transparent" />

                {/* Animated dots */}
                <div className="flex items-center space-x-2">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay }}
                      className="w-2 h-2 rounded-full bg-burgundy-800/50 dark:bg-amber-400/60"
                    />
                  ))}
                </div>

                {/* Close CTA */}
                <button
                  onClick={onClose}
                  className="mt-1 w-full py-3 rounded-2xl
                             bg-burgundy-900 dark:bg-amber-500
                             text-cream-50 dark:text-stone-950
                             font-bold text-xs uppercase tracking-widest
                             hover:bg-burgundy-700 dark:hover:bg-amber-400
                             transition-colors shadow-lg shadow-burgundy-900/25 dark:shadow-amber-500/20"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
