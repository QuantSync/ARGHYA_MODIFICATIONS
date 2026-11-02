'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

interface SoldOutSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSelectSize?: (size: string) => void;
}

export const SoldOutSizeModal: React.FC<SoldOutSizeModalProps> = ({
  isOpen,
  onClose,
  productName,
  onSelectSize,
}) => {
  // ESC key listener
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
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleSwitchToL = () => {
    if (onSelectSize) {
      onSelectSize('L');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          {/* Backdrop with heavy smooth blur */}
          <motion.div
            key="soldout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/70 dark:bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            key="soldout-card"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.82, y: 24, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 16, rotate: 1 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="relative w-full max-w-[420px] z-10 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F5] to-[#FFF1EA] dark:from-[#1A0A10] dark:via-[#16060A] dark:to-[#0D0407] border border-rose-300/40 dark:border-amber-500/30 text-stone-900 dark:text-stone-100 p-6 sm:p-7 text-center"
            style={{
              boxShadow: '0 25px 60px -15px rgba(225, 29, 72, 0.25), 0 0 40px rgba(251, 191, 36, 0.15)',
            }}
          >
            {/* Top Pink-Amber Accent Glow Strip */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400 opacity-90" />

            {/* Close Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-100 dark:bg-white/10 text-rose-700 dark:text-stone-300 hover:text-rose-900 dark:hover:text-white flex items-center justify-center transition-colors shadow-sm"
            >
              <X size={16} strokeWidth={2.5} />
            </motion.button>

            {/* Cute Animated Character / Floating Illustration */}
            <div className="relative mx-auto w-32 h-32 mb-4 flex items-center justify-center">
              {/* Pulsing ambient rings */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-300/40 to-amber-300/30 dark:from-rose-500/20 dark:to-amber-500/20 blur-xl"
              />

              {/* Floating Hearts */}
              <motion.div
                animate={{ y: [-2, -14, -2], opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute -top-1 -right-1 text-rose-500"
              >
                <Heart size={18} fill="#f43f5e" />
              </motion.div>
              <motion.div
                animate={{ y: [-4, -16, -4], opacity: [0.5, 0.9, 0.5], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                className="absolute top-2 -left-2 text-amber-500"
              >
                <Sparkles size={16} fill="#f59e0b" />
              </motion.div>

              {/* Animated Cute Bouncing Bag Avatar */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 flex flex-col items-center justify-center shadow-lg shadow-rose-500/30 border-2 border-white/80 dark:border-rose-400/50"
              >
                {/* Bag Handle */}
                <div className="absolute -top-3 w-10 h-6 border-[3px] border-rose-300/90 rounded-t-full bg-transparent" />

                {/* Cute Kawaii Face */}
                <div className="flex items-center space-x-4 mb-1">
                  {/* Left Eye */}
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.92, 0.95, 1] }}
                    className="w-2.5 h-3 bg-white rounded-full relative flex items-center justify-center"
                  >
                    <div className="w-1 h-1 bg-rose-950 rounded-full" />
                  </motion.div>
                  {/* Right Eye */}
                  <motion.div
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.92, 0.95, 1] }}
                    className="w-2.5 h-3 bg-white rounded-full relative flex items-center justify-center"
                  >
                    <div className="w-1 h-1 bg-rose-950 rounded-full" />
                  </motion.div>
                </div>

                {/* Blush cheeks */}
                <div className="flex items-center justify-between w-12 px-1 mb-0.5">
                  <div className="w-2 h-1 rounded-full bg-pink-200/80" />
                  <div className="w-2 h-1 rounded-full bg-pink-200/80" />
                </div>

                {/* Cute Open Smiling Mouth (｡♥‿♥｡) */}
                <div className="w-2.5 h-1.5 border-b-2 border-white rounded-full -mt-0.5" />

                {/* Mini "S" Tag hanging */}
                <motion.div
                  animate={{ rotate: [-6, 6, -6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-2 bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md border border-white"
                >
                  Size S
                </motion.div>
              </motion.div>
            </div>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>All Pieces Sold Out</span>
            </div>

            {/* Main Headline */}
            <h3 className="text-xl sm:text-2xl font-serif font-black text-rose-950 dark:text-rose-100 tracking-tight leading-tight">
              Oops! Size &ldquo;S&rdquo; Is All Sold Out
            </h3>

            {/* Sweet & Friendly Explanation */}
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Every single piece of <span className="font-semibold text-rose-700 dark:text-rose-300">Size S</span> for{' '}
              <span className="font-semibold text-stone-900 dark:text-white">&ldquo;{productName}&rdquo;</span> has been completely snatched up by our lovely shoppers! 🌸✨
            </p>

            {/* Helpful In-Stock Recommendation Box */}
            <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-left flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <ShoppingBag size={14} />
              </div>
              <div className="text-[11px] sm:text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                <p className="font-bold text-amber-800 dark:text-amber-200">
                  Good news: Sizes L, XL, &amp; XXL are in stock!
                </p>
                <p className="mt-0.5 text-stone-600 dark:text-stone-400">
                  They offer a relaxed, easy drape with side dori tie-ups. We recommend grabbing your piece before they sell out too!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSwitchToL}
                className="w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 shadow-lg shadow-amber-500/25 border-none cursor-pointer transition-all"
              >
                <span>Switch to Size L (In Stock)</span>
                <ArrowRight size={14} />
              </motion.button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Browse other sizes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
