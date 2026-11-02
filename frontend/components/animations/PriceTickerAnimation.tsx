'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceTickerAnimationProps {
  isVisible: boolean;
  fromPrice: number;
  toPrice: number;
  onComplete?: () => void;
  couponCode?: string;
  discountLabel?: string;
  redirectUrl?: string;
  redirectMessage?: string;
}

/**
 * PriceTickerAnimation
 * Superimposed animated overlay that counts down the price from `fromPrice`
 * to `toPrice` when a coupon is applied. Renders as a fixed full-screen
 * overlay so it never disturbs the document flow.
 */
export const PriceTickerAnimation: React.FC<PriceTickerAnimationProps> = ({
  isVisible,
  fromPrice,
  toPrice,
  onComplete,
  couponCode = '',
  discountLabel,
  redirectUrl,
  redirectMessage,
}) => {
  const [displayPrice, setDisplayPrice] = useState(fromPrice);
  const [phase, setPhase] = useState<'idle' | 'counting' | 'done'>('idle');
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const DURATION = 1800;

  useEffect(() => {
    if (!isVisible) {
      setPhase('idle');
      setDisplayPrice(fromPrice);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    setDisplayPrice(fromPrice);
    setPhase('counting');
    startTimeRef.current = null;

    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(fromPrice - eased * (fromPrice - toPrice));
      setDisplayPrice(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayPrice(toPrice);
        setPhase('done');
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    if (phase === 'done') {
      const holdTime = redirectUrl ? 1100 : 400;
      const t = setTimeout(() => {
        if (redirectUrl && typeof window !== 'undefined') {
          window.location.href = redirectUrl;
        }
        onComplete?.();
      }, holdTime);
      return () => clearTimeout(t);
    }
  }, [phase, redirectUrl, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="price-ticker-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ pointerEvents: 'none' }}
          className="fixed inset-0 z-[9000] flex items-center justify-center"
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[3px]" />

          {/* Ticker Card */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center gap-3 rounded-3xl px-10 py-8 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%)',
              border: '1px solid rgba(251,191,36,0.3)',
              boxShadow: '0 0 60px rgba(251,191,36,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Coupon badge */}
            {couponCode && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.4)' }}
              >
                <span>🎟️</span>
                <span>{couponCode} Applied</span>
                <span>✓</span>
              </motion.div>
            )}

            <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: 'rgba(251,191,36,0.6)' }}>
              {discountLabel || (fromPrice > toPrice ? `Instant Savings: Rs ${(fromPrice - toPrice).toLocaleString('en-IN')} OFF` : 'Special Discount')}
            </span>

            {/* Animated price */}
            <div className="flex items-baseline gap-3">
              <span className="text-base font-mono line-through" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Rs {fromPrice.toLocaleString('en-IN')}
              </span>
              <span
                className="text-5xl font-black font-mono"
                style={{
                  color: '#fbbf24',
                  textShadow: '0 0 30px rgba(251,191,36,0.6)',
                }}
              >
                Rs {displayPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Savings pill */}
            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180 }}
                className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)' }}
              >
                <span>💸</span>
                <span>You save Rs {(fromPrice - toPrice).toLocaleString('en-IN')}!</span>
              </motion.div>
            )}

            {/* Redirect notification pill */}
            {redirectMessage && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring' }}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(29,78,216,0.28) 100%)',
                  border: '1px solid rgba(96,165,250,0.45)',
                  color: '#93c5fd',
                  boxShadow: '0 0 20px rgba(37,99,235,0.25)',
                }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="inline-block text-sm"
                >
                  ⚡
                </motion.span>
                <span>{redirectMessage}</span>
              </motion.div>
            )}

            {/* Shimmer progress bar */}
            <div className="w-full rounded-full overflow-hidden mt-1" style={{ height: 3, background: 'rgba(251,191,36,0.1)' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION / 1000, ease: 'easeInOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
