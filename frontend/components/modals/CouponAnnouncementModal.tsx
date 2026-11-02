'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Tag } from 'lucide-react';

/* ─── Animation presets ─── */
const BACKDROP_T = { duration: 0.25, ease: [0.32, 0, 0.67, 0] };
const CARD_SPRING = { type: 'spring' as const, stiffness: 340, damping: 30, mass: 0.85 };
const ICON_SPRING = { delay: 0.15, type: 'spring' as const, stiffness: 320, damping: 22 };
const COUPON_SPRING = { delay: 0.28, type: 'spring' as const, stiffness: 340, damping: 26 };

interface CouponAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

/**
 * CouponAnnouncementModal
 * A blurred-backdrop popup card that appears when the user opens a coupon-eligible
 * product page.  Announces "use ARGHYA10 to avail 10% discount instantly."
 * Auto-closes after 6 seconds if the user doesn't dismiss it first.
 */
export const CouponAnnouncementModal: React.FC<CouponAnnouncementModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const shouldReduceMotion = useReducedMotion();
  // Auto-dismiss after 6 s
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            key="coupon-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={BACKDROP_T}
            className="fixed inset-0 z-[8000] bg-black/40 backdrop-blur-md"
            style={{ willChange: 'opacity' }}
            onClick={onClose}
          />

          {/* Pop card */}
          <motion.div
            key="coupon-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.72, opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.88, opacity: 0, y: -12 }}
            transition={CARD_SPRING}
            className="fixed inset-0 z-[8001] flex items-center justify-center pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              className="relative pointer-events-auto mx-4 max-w-sm w-full rounded-[2rem] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1c0707 0%, #2e1111 40%, #1c0707 100%)',
                border: '1px solid rgba(251,191,36,0.35)',
                boxShadow: '0 0 80px rgba(251,191,36,0.12), 0 30px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Shimmer strip at top */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, transparent, #fbbf24, #f59e0b, transparent)',
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:scale-110 z-10"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                aria-label="Close announcement"
              >
                <X size={14} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center gap-5 px-8 py-10 text-center">
                {/* Festive icon ring */}
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{
                    rotate: 0,
                    scale: 1,
                    boxShadow: [
                      '0 0 14px rgba(251,191,36,0.15)',
                      '0 0 32px rgba(251,191,36,0.45)',
                      '0 0 14px rgba(251,191,36,0.15)',
                    ],
                  }}
                  transition={{
                    rotate: ICON_SPRING,
                    scale: ICON_SPRING,
                    boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
                  }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))',
                    border: '1px solid rgba(251,191,36,0.4)',
                    willChange: 'transform, box-shadow',
                  }}
                >
                  🎊
                </motion.div>

                {/* Headline */}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest font-mono" style={{ color: 'rgba(251,191,36,0.6)' }}>
                    Exclusive Offer · {productName}
                  </p>
                  <h2
                    className="text-xl font-black font-serif leading-snug"
                    style={{ color: '#f5f5f0' }}
                  >
                    Instant 10% Off — Just for You!
                  </h2>
                </div>

                {/* Coupon box */}
                <motion.div
                  initial={{ scale: 0.82, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={COUPON_SPRING}
                  className="flex items-center gap-3 w-full rounded-xl px-5 py-3"
                  style={{
                    background: 'rgba(251,191,36,0.08)',
                    border: '1.5px dashed rgba(251,191,36,0.5)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <Tag size={16} style={{ color: '#fbbf24' }} />
                  <span
                    className="text-xl font-black font-mono tracking-widest"
                    style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.5)' }}
                  >
                    ARGHYA10
                  </span>
                </motion.div>

                {/* Description */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Apply coupon&nbsp;<strong style={{ color: '#fbbf24' }}>ARGHYA10</strong>&nbsp;at checkout or on the product catalogue page to avail an&nbsp;<strong style={{ color: '#4ade80' }}>instant 10% discount</strong>&nbsp;on this item.
                </p>

                {/* CTA */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.04, boxShadow: '0 12px 30px rgba(251,191,36,0.45)' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#1c0707',
                    willChange: 'transform',
                  }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    className="pointer-events-none absolute inset-0 block"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{ backgroundPositionX: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.8 }}
                  />
                  Got it — Shop Now!
                </motion.button>
              </div>

              {/* Shimmer strip at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, transparent, #f59e0b, #fbbf24, transparent)',
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
