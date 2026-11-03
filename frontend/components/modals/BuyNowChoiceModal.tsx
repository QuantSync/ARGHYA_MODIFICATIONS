'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Truck, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../lib/api';

export interface BuyNowChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  selectedSize?: string;
  onPayOnline: () => void;
  onCashOnDelivery: () => void;
  onPayOnDelivery: () => void;
  onWhatsAppOrder?: () => void;
}

export const BuyNowChoiceModal: React.FC<BuyNowChoiceModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedSize,
  onPayOnline,
  onCashOnDelivery,
  onPayOnDelivery,
  onWhatsAppOrder,
}) => {
  // ESC to close
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

  if (!product) return null;

  const defaultWhatsAppHandler = () => {
    const text = `Hello Arghya Atelier! I would like to order: *${product.name}* (Price: ₹${product.price.toLocaleString('en-IN')}${selectedSize ? `, Size: ${selectedSize}` : ''}). Please confirm my order.`;
    const url = `https://wa.me/918882827148?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
    onClose();
  };

  const handleWhatsApp = onWhatsAppOrder || defaultWhatsAppHandler;

  const productImage = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* ── Background Blur Backdrop ── */}
          <motion.div
            key="buynow-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-[9991]"
            aria-hidden="true"
          />

          {/* ── Center Card Widget with Blur & Transparency Effect ── */}
          <motion.div
            key="buynow-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="buynow-modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className={[
              'relative z-[9992] w-full max-w-lg',
              // Frosted glassmorphism transparency & blur
              'bg-white/90 dark:bg-neutral-950/85',
              'backdrop-blur-2xl backdrop-saturate-150',
              'border border-white/50 dark:border-white/10',
              'rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]',
              'p-6 sm:p-8',
              'overflow-hidden select-none',
            ].join(' ')}
          >
            {/* Ambient subtle glow ring */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-24 w-48 h-48 bg-white/20 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-24 w-48 h-48 bg-neutral-400/20 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Product Summary Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-black/10 dark:border-white/10 pr-8">
              {productImage && (
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-sm">
                  <Image
                    src={productImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-bold block mb-0.5">
                  Arghya Atelier
                </span>
                <h3
                  id="buynow-modal-title"
                  className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wide text-black dark:text-white truncate"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-base sm:text-lg font-bold text-black dark:text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-xs text-neutral-400 line-through">
                      ₹{product.compare_at_price.toLocaleString('en-IN')}
                    </span>
                  )}
                  {selectedSize && selectedSize !== 'Free Size' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
                      Size: {selectedSize}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="py-4">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold text-center">
                Select Your Preferred Checkout Method
              </p>
            </div>

            {/* ── The 4 Options ── */}
            <div className="flex flex-col gap-3">

              {/* 1. BUY NOW (Pay Online) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.015, y: -1.5 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  onClose();
                  onPayOnline();
                }}
                className={[
                  'group w-full flex items-center justify-between p-4 rounded-2xl',
                  'bg-black text-white dark:bg-white dark:text-black',
                  'shadow-lg shadow-black/10',
                  'hover:bg-neutral-800 dark:hover:bg-neutral-100',
                  'transition-all duration-200 border border-transparent',
                  'text-left relative overflow-hidden',
                ].join(' ')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/10 dark:bg-black/10 flex items-center justify-center shrink-0">
                    <CreditCard size={20} className="text-white dark:text-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
                        BUY NOW (PAY ONLINE)
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 dark:text-emerald-700">
                        Fastest
                      </span>
                    </div>
                    <p className="text-[11px] text-white/70 dark:text-black/70 mt-0.5 font-normal">
                      Instant payment via UPI, Credit/Debit Cards, NetBanking
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-white dark:text-black opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </motion.button>

              {/* 2. BUY NOW WITH CASH ON DELIVERY */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.015, y: -1.5 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  onClose();
                  onCashOnDelivery();
                }}
                className={[
                  'group w-full flex items-center justify-between p-4 rounded-2xl',
                  'bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white',
                  'hover:bg-neutral-800 dark:hover:bg-neutral-700',
                  'transition-all duration-200 border border-white/10',
                  'text-left relative overflow-hidden shadow-md',
                ].join(' ')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
                        BUY NOW WITH CASH ON DELIVERY
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300 mt-0.5 font-normal">
                      Secured via Razorpay · ₹15 handling fee only, pay rest on delivery
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-white opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </motion.button>

              {/* 3. BUY NOW WITH PAYMENT ON DELIVERY */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.015, y: -1.5 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  onClose();
                  onPayOnDelivery();
                }}
                className={[
                  'group w-full flex items-center justify-between p-4 rounded-2xl',
                  'bg-white/80 dark:bg-neutral-900/80',
                  'hover:bg-white dark:hover:bg-neutral-850',
                  'border-2 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white',
                  'transition-all duration-200 text-black dark:text-white',
                  'text-left relative overflow-hidden shadow-sm',
                ].join(' ')}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Truck size={20} className="text-black dark:text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">
                        BUY NOW WITH PAYMENT ON DELIVERY
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-normal">
                      100% Cash payment when order arrives at your address
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-black dark:text-white opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </motion.button>

            </div>

            {/* Footer Trust Note */}
            <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-4 text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              <span>100% SECURE CHECKOUT</span>
              <span>•</span>
              <span>AUTHENTIC 925 SILVER</span>
              <span>•</span>
              <span>EASY EXCHANGES</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BuyNowChoiceModal;

