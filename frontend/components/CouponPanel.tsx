'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { isNavratriCoupon, VALID_COUPON, SPECIAL_COUPON_1, SPECIAL_COUPON_2, useCouponStore } from '../store/couponStore';

const DISCOUNT_PERCENT_NAVRATRI = 5;
const DISCOUNT_PERCENT_LEGACY   = 10;

export const COUPON_ELIGIBLE_SLUGS: string[] = [];

interface CouponPanelProps {
  /** Called when a valid coupon is entered. Passes the discount percentage and code. */
  onCouponApplied: (discountPercent: number, code: string) => void;
  /** Called when coupon is removed */
  onCouponRemoved: () => void;
  isCouponActive: boolean;
}

/**
 * CouponPanel
 * Sticky right-side panel on the product catalogue page for entering coupon codes.
 */
export const CouponPanel: React.FC<CouponPanelProps> = ({
  onCouponApplied,
  onCouponRemoved,
  isCouponActive,
}) => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shake, setShake] = useState(false);

  const isLegacyCode = (c: string) =>
    c === VALID_COUPON || c === SPECIAL_COUPON_1 || c === SPECIAL_COUPON_2;

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (isNavratriCoupon(trimmed) || isLegacyCode(trimmed)) {
      setStatus('valid');
      const pct = isNavratriCoupon(trimmed) ? DISCOUNT_PERCENT_NAVRATRI : DISCOUNT_PERCENT_LEGACY;
      onCouponApplied(pct, trimmed);
    } else {
      setStatus('invalid');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const handleRemove = () => {
    setStatus('idle');
    setCode('');
    onCouponRemoved();
  };

  const { activeCouponCode: storeCouponCode } = useCouponStore();
  const activeCode = code.trim().toUpperCase() || storeCouponCode || '';
  const activeIsNavratri = isCouponActive && isNavratriCoupon(activeCode);
  const discountLabel = activeIsNavratri ? '5% Navratri Discount Active' : '10% Instant Discount Active';

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      className="sticky top-28 w-full"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(28,7,7,0.97) 0%, rgba(46,17,17,0.97) 100%)',
          border: '1px solid rgba(251,191,36,0.25)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(251,191,36,0.06)',
        }}
      >
        {/* Header */}
        <button
          onClick={() => setIsCollapsed(c => !c)}
          className="w-full flex items-center justify-between px-5 py-4 transition-all hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}
            >
              <Tag size={13} style={{ color: '#fbbf24' }} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#fbbf24' }}>
              Coupon Code
            </span>
          </div>
          {isCollapsed
            ? <ChevronDown size={14} style={{ color: 'rgba(251,191,36,0.5)' }} />
            : <ChevronUp   size={14} style={{ color: 'rgba(251,191,36,0.5)' }} />
          }
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(251,191,36,0.12)' }} />

        {/* Body */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="panel-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 py-5 space-y-4">
                {/* Eligible products note */}
                <div
                  className="rounded-xl px-3 py-2.5 space-y-1"
                  style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles size={10} style={{ color: '#fbbf24' }} />
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#fbbf24' }}>
                      Festive Fine Jewellery Offer
                    </span>
                  </div>
                  <p className="text-[9px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Exclusive discounts on select 925 sterling silver and anti-tarnish collections
                  </p>
                </div>

                {/* Input row */}
                {!isCouponActive ? (
                  <motion.div
                    animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={code}
                      onChange={e => { setCode(e.target.value.toUpperCase()); setStatus('idle'); }}
                      onKeyDown={e => e.key === 'Enter' && handleApply()}
                      placeholder="Enter code"
                      maxLength={20}
                      className="flex-1 rounded-xl px-3 py-2.5 text-sm font-mono font-bold uppercase tracking-wider outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${status === 'invalid' ? 'rgba(239,68,68,0.6)' : 'rgba(251,191,36,0.2)'}`,
                        color: '#f5f5f0',
                        caretColor: '#fbbf24',
                      }}
                    />
                    <button
                      onClick={handleApply}
                      disabled={!code.trim()}
                      className="rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: code.trim() ? 'linear-gradient(135deg,#fbbf24,#f59e0b)' : 'rgba(251,191,36,0.15)',
                        color: '#1c0707',
                        boxShadow: code.trim() ? '0 4px 16px rgba(251,191,36,0.25)' : 'none',
                      }}
                    >
                      Apply
                    </button>
                  </motion.div>
                ) : (
                  /* Active coupon display */
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      background: 'rgba(34,197,94,0.08)',
                      border: '1.5px dashed rgba(34,197,94,0.4)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: '#4ade80' }} />
                      <span className="text-sm font-black font-mono tracking-widest" style={{ color: '#4ade80' }}>
                        {activeCode}
                      </span>
                    </div>
                    <button
                      onClick={handleRemove}
                      className="text-[10px] uppercase tracking-wider transition-all hover:scale-105"
                      style={{ color: 'rgba(239,68,68,0.7)' }}
                    >
                      Remove
                    </button>
                  </motion.div>
                )}

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'valid' && !isCouponActive && (
                    <motion.p
                      key="valid-msg"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-[11px] font-semibold"
                      style={{ color: '#4ade80' }}
                    >
                      <CheckCircle size={12} /> Coupon applied! Discount active on eligible products.
                    </motion.p>
                  )}
                  {status === 'invalid' && (
                    <motion.p
                      key="invalid-msg"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 text-[11px] font-semibold"
                      style={{ color: '#f87171' }}
                    >
                      <XCircle size={12} /> Invalid coupon code.
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Discount badge */}
                <AnimatePresence>
                  {isCouponActive && (
                    <motion.div
                      key="discount-badge"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl px-4 py-3"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))',
                        border: '1px solid rgba(251,191,36,0.2)',
                      }}
                    >
                      <span className="text-lg">🎉</span>
                      <div>
                        <p className="text-xs font-black" style={{ color: '#fbbf24' }}>{discountLabel}</p>
                        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Applied on eligible products below</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
