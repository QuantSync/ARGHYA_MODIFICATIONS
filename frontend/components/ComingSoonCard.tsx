'use client';

/**
 * ComingSoonCard.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A standalone modal widget shown when the user clicks on a payment gateway
 * (Stripe, Cashfree, Paytm) that is not yet available.
 *
 * Features
 * ────────
 *  • Full-screen blur backdrop — clicking it closes the modal.
 *  • Purple / violet brand palette (distinct from Razorpay blue & site amber).
 *  • Animated gateway emoji icon (pulse + wobble loop).
 *  • Gradient "Coming Soon" heading.
 *  • ✕ close button (rotates 90° on hover).
 *  • Two CTAs: "Got It" (dismiss) · "Notify Me" (dismiss — placeholder for future hook).
 *  • Hint that Razorpay is currently available.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Sparkles, Bell } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ComingSoonCardProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Called when user dismisses the modal */
  onClose: () => void;
  /** Display name of the gateway, e.g. "Stripe (International Cards)" */
  gatewayName?: string;
  /** Emoji / icon character to animate, e.g. "💳" */
  gatewayIcon?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({
  isOpen,
  onClose,
  gatewayName = 'This Payment Method',
  gatewayIcon = '💳',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Blur backdrop ─────────────────────────────────────────────── */}
          <motion.div
            key="cs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/55"
            style={{
              backdropFilter: 'blur(10px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(10px) saturate(1.4)',
            }}
            aria-hidden="true"
          />

          {/* ── Card ──────────────────────────────────────────────────────── */}
          <motion.div
            key="cs-card"
            initial={{ opacity: 0, scale: 0.86, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.86, y: 30 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Coming Soon"
          >
            <div
              className="relative w-full max-w-sm pointer-events-auto rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #0f172a 0%, #0a1128 100%)',
                border: '1px solid rgba(168,85,247,0.38)',
                boxShadow:
                  '0 0 0 1px rgba(168,85,247,0.13),' +
                  '0 24px 64px rgba(0,0,0,0.70),' +
                  '0 0 90px rgba(139,92,246,0.11)',
              }}
            >
              {/* Purple top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #a855f7 35%, #c084fc 65%, transparent)',
                }}
              />

              {/* Soft radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(139,92,246,0.11) 0%, transparent 70%)',
                }}
              />

              {/* ── Content ──────────────────────────────────────────────── */}
              <div className="relative z-10 p-7 space-y-6">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-purple-400" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400">
                      Feature Announcement
                    </span>
                  </div>

                  {/* ✕ Close */}
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    aria-label="Close coming soon card"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                {/* Main body */}
                <div className="text-center space-y-4">

                  {/* Animated gateway icon */}
                  <motion.div
                    animate={{
                      scale: [1, 1.13, 1],
                      rotate: [0, 7, -7, 0],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-5xl mx-auto w-fit select-none"
                  >
                    {gatewayIcon}
                  </motion.div>

                  <div>
                    <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">
                      {gatewayName}
                    </p>

                    {/* "Coming Soon" gradient heading */}
                    <motion.h2
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 }}
                      className="font-black text-3xl leading-tight"
                      style={{
                        background:
                          'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Coming Soon
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-400 text-sm leading-relaxed mt-2 max-w-[260px] mx-auto"
                    >
                      We&apos;re working hard to bring this payment option online.
                      Hang tight &mdash; it&apos;ll be worth the wait!
                    </motion.p>
                  </div>

                  {/* "Currently available" hint pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.22, type: 'spring' }}
                    className="flex items-center justify-center gap-2 rounded-xl px-4 py-3"
                    style={{
                      background: 'rgba(139,92,246,0.10)',
                      border: '1px solid rgba(168,85,247,0.22)',
                    }}
                  >
                    <Clock size={14} className="text-purple-400 shrink-0" />
                    <span className="text-purple-300 text-xs font-semibold">
                      Currently available: Razorpay (UPI, Cards, NetBanking)
                    </span>
                  </motion.div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3 pt-1">
                  {/* Got It */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#94a3b8',
                    }}
                  >
                    Got It
                  </motion.button>

                  {/* Notify Me */}
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 8px 28px rgba(139,92,246,0.52)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="flex-[2] py-3 rounded-xl text-sm font-black tracking-wide text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                      boxShadow: '0 4px 18px rgba(109,40,217,0.42)',
                    }}
                  >
                    <Bell size={14} strokeWidth={2.5} />
                    Notify Me
                  </motion.button>
                </div>

                {/* Fine print */}
                <p className="text-center text-[10px] text-slate-600 leading-relaxed">
                  For now, use <span className="text-purple-500 font-semibold">Razorpay</span> for
                  instant, secure checkout &mdash; UPI, Cards &amp; NetBanking supported.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};