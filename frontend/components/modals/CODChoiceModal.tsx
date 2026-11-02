'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck } from 'lucide-react';
import { Product } from '../../lib/api';
import { ComingSoonModal } from './ComingSoonModal';

interface CODChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  /** Called when user picks "Continue with Razorpay (COD)" — receives a ₹15 handling-fee product */
  onRazorpayCOD?: (handlingFeeProduct: Product) => void;
  /** Called when user picks "Pay On Delivery" — receives the original product */
  onPayOnDelivery?: (product: Product) => void;
}

/**
 * CODChoiceModal
 * ─────────────────────────────────────────────────────────────────
 * A blurred-backdrop card widget that presents two delivery options:
 *  1. Continue Cash On Delivery with Razorpay
 *     → charges ₹15 handling fee via Razorpay (not the full product price)
 *  2. Continue with Pay On Delivery
 *     → passes original product for reference / confirmation
 *
 * Centering: uses inline style transform so framer-motion's own
 * scale/y animations do not fight with Tailwind translate classes.
 * ─────────────────────────────────────────────────────────────────
 */
export const CODChoiceModal: React.FC<CODChoiceModalProps> = ({
  isOpen,
  onClose,
  product,
  onRazorpayCOD,
  onPayOnDelivery,
}) => {
  const [isComingSoonOpen, setIsComingSoonOpen] = React.useState(false);

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

  /**
   * Razorpay COD: user pays only ₹15 as a handling / confirmation fee.
   * We construct a synthetic product object so PaymentRedirectCard
   * displays and charges ₹15 — the rest is collected on delivery.
   */
  const handleRazorpayCOD = () => {
    if (!product || !onRazorpayCOD) { onClose(); return; }

    const handlingFeeProduct: Product = {
      ...product,
      // Override price to ₹15 handling fee
      price: 15,
      compare_at_price: undefined,
      name: `COD Handling Fee — ${product.name}`,
      // Use a special slug that prepends 'cod-' to the product slug
      // so it can match specific Razorpay direct links in PaymentRedirectCard
      slug: product.slug ? `cod-${product.slug}` : 'cod-handling-fee',
    };

    onRazorpayCOD(handlingFeeProduct);
    onClose();
  };

  const handlePayOnDelivery = () => {
    if (onPayOnDelivery && product) {
      onPayOnDelivery(product);
      onClose();
      return;
    }
    setIsComingSoonOpen(true);
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Blurred backdrop ── */}
          <motion.div
            key="cod-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* ── Modal card ──
              IMPORTANT: centering is done via inline style (not Tailwind translate
              classes) so framer-motion's scale/y animations don't fight with
              CSS transforms on the same element.
          ── */}
          <motion.div
            key="cod-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cod-modal-title"
            /* Entrance: scale up from slightly small + slight y-lift */
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            /* Centering via inline style — immune to CSS transform conflicts */
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              zIndex: 9999,
              width: 'min(calc(100vw - 2rem), 400px)',
            }}
            onClick={(e) => e.stopPropagation()}
            className={[
              'bg-[#FAF4EC] dark:bg-[#1A0A0D]',
              'border border-[#2A0A10]/20 dark:border-[#3D0C11]/60',
              'rounded-2xl shadow-2xl',
              'p-6 sm:p-8',
              'overflow-hidden',
            ].join(' ')}
          >
            {/* Decorative top accent bar */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#2A0A10] via-[#731C24] to-[#2A0A10]"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close delivery options"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#3D0C11]/60 dark:text-stone-400 hover:bg-[#2A0A10]/10 dark:hover:bg-stone-800/60 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-6">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#731C24] dark:text-amber-500 mb-1">
                ARGHYA COLLECTIONS
              </p>
              <h2
                id="cod-modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-[#2A0A10] dark:text-stone-100 leading-tight"
              >
                Choose Delivery Option
              </h2>
              {product && (
                <p className="mt-1 text-xs text-[#3D0C11]/60 dark:text-stone-400 line-clamp-1">
                  {product.name}
                  {product.price != null && (
                    <span className="ml-1 font-semibold text-[#2A0A10] dark:text-amber-400">
                      · ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Option buttons */}
            <div className="flex flex-col gap-3">

              {/* Option 1 — Razorpay COD (₹15 handling fee) */}
              <motion.button
                type="button"
                id="cod-razorpay-btn"
                whileHover={{ scale: 1.02, y: -2, transition: { type: 'spring', stiffness: 360, damping: 18 } }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRazorpayCOD}
                className={[
                  'group w-full flex items-start gap-4 p-4 rounded-xl',
                  'bg-[#2A0A10] dark:bg-[#1C0508]',
                  'border border-[#2A0A10] dark:border-[#3D0C11]',
                  'text-left shadow-md',
                  'hover:bg-[#3D0C11] dark:hover:bg-[#2A0A10]',
                  'transition-colors duration-200',
                ].join(' ')}
              >
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <CreditCard size={18} className="text-amber-300" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-white leading-snug">
                    Continue Cash On Delivery
                  </span>
                  <span className="block text-[10px] text-white/60 mt-0.5">
                    Secured via Razorpay · ₹15 handling fee only
                  </span>
                </span>
                <span className="self-center text-amber-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-lg leading-none">
                  →
                </span>
              </motion.button>

              {/* Option 2 — Pay On Delivery */}
              <motion.button
                type="button"
                id="cod-pod-btn"
                whileHover={{ scale: 1.02, y: -2, transition: { type: 'spring', stiffness: 360, damping: 18 } }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePayOnDelivery}
                className={[
                  'group w-full flex items-start gap-4 p-4 rounded-xl',
                  'bg-transparent',
                  'border-2 border-[#2A0A10]/25 dark:border-[#3D0C11]/50',
                  'text-left',
                  'hover:border-[#2A0A10]/60 dark:hover:border-[#731C24]/70',
                  'hover:bg-[#2A0A10]/5 dark:hover:bg-[#1C0508]/40',
                  'transition-colors duration-200',
                ].join(' ')}
              >
                <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#2A0A10]/10 dark:bg-[#1C0508]/40 flex items-center justify-center">
                  <Truck size={18} className="text-[#2A0A10] dark:text-amber-400" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#2A0A10] dark:text-stone-100 leading-snug">
                    Continue With Pay On Delivery
                  </span>
                  <span className="block text-[10px] text-[#3D0C11]/50 dark:text-stone-400 mt-0.5">
                    Pay in cash when your order arrives
                  </span>
                </span>
                <span className="self-center text-[#2A0A10]/50 dark:text-stone-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-lg leading-none">
                  →
                </span>
              </motion.button>

            </div>

            {/* Footer note */}
            <p className="mt-5 text-center text-[10px] text-[#3D0C11]/40 dark:text-stone-600 font-medium">
              100% Safe · Authentic Arghya Couture · Free Shipping
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <ComingSoonModal
      isOpen={isComingSoonOpen}
      onClose={() => setIsComingSoonOpen(false)}
      title={<>Coming <span className="italic text-burgundy-700 dark:text-amber-400">Soon</span></>}
      description="Pay on Delivery is currently being rolled out to more pincodes. It will be available shortly."
    />
    </>
  );
};
