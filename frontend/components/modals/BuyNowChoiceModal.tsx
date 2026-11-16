'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  X,
  ShoppingCart,
  Lock,
  Info,
  ShieldCheck,
} from 'lucide-react';
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
}) => {
  // ESC key to close
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* ── Background Backdrop with Smooth Fade ── */}
          <motion.div
            key="buynow-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9991]"
            aria-hidden="true"
          />

          {/* ── Center Pop Fade-In Modal Widget ── */}
          <motion.div
            key="buynow-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            onClick={(e) => e.stopPropagation()}
            className={[
              'relative z-[9992] w-full max-w-lg',
              'bg-[#f0f1f4] dark:bg-[#151618]',
              'border border-neutral-300 dark:border-neutral-800',
              'rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]',
              'overflow-hidden select-none flex flex-col',
              'max-h-[94vh]',
            ].join(' ')}
          >
            {/* ── 1. Top Header Bar with Back Arrow, Logo & Secured Payment / Close Button ── */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
              {/* Left: Back Arrow Button (closes the widget) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Back / Close checkout"
                title="Back / Close"
                className="p-1 -ml-1 text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <ChevronLeft size={28} strokeWidth={2.4} />
              </button>

              {/* Center: ARGHYA Brand Logo */}
              <div className="flex items-center justify-center">
                <Image
                  src="/images/arghya_logo_nav.png"
                  alt="ARGHYA Slay Everyday"
                  width={130}
                  height={52}
                  className="object-contain max-h-9 w-auto"
                  priority
                  quality={100}
                />
              </div>

              {/* Right: 100% Secured Payment & Cross Close Button */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[11px] font-sans font-medium text-neutral-600 dark:text-neutral-300">
                  <span>100% Secured Payment</span>
                  <Lock size={12} className="stroke-[2.2] text-neutral-600 dark:text-neutral-300" />
                </div>
                {/* Cross Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close checkout"
                  title="Close"
                  className="p-1.5 rounded-full text-neutral-500 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-0.5 cursor-pointer"
                >
                  <X size={18} strokeWidth={2.4} />
                </button>
              </div>
            </div>

            {/* Scrollable Container for Banner and Body */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              {/* ── 2. Top Banner: "BUY 1 GET 1" (Crystal clear high-res image) ── */}
              <div className="relative w-full aspect-[3.05/1] bg-black overflow-hidden shrink-0">
                <Image
                  src="/images/banners/banner_buy1get1_free_3x.png"
                  alt="BUY 1 GET 1 Special Jewellery Offer"
                  fill
                  sizes="(max-width: 640px) 100vw, 550px"
                  className="object-cover object-center"
                  priority
                  quality={100}
                />
              </div>

              {/* ── 3. Content Body ── */}
              <div className="p-4 sm:p-5 space-y-4 sm:space-y-4.5">

                {/* ── SECTION: ORDER SUMMARY ── */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">
                    ORDER SUMMARY
                  </h4>
                  <div className="w-full bg-[#f6f7f9] dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 rounded-2xl px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <ShoppingCart size={22} className="text-black dark:text-white shrink-0 stroke-[2]" />
                      <span className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wide text-black dark:text-white truncate">
                        {product.name}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-xs sm:text-sm text-black dark:text-white shrink-0 tracking-wide whitespace-nowrap">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* ── SECTION: DELIVERY METHODS ── */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">
                    DELIVERY METHODS
                  </h4>

                  <div className="space-y-2">
                    {/* Option 1: Cash On Delivery (₹15 handling fee) */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        onClose();
                        onCashOnDelivery();
                      }}
                      className="w-full bg-black hover:bg-neutral-900 text-white rounded-2xl p-4 flex items-center justify-between gap-3 text-left transition-all shadow-md group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Radio indicator */}
                        <div className="w-5 h-5 rounded-full border-2 border-white/80 shrink-0 group-hover:border-white transition-colors" />
                        <div className="font-sans font-semibold text-xs sm:text-sm leading-snug text-white">
                          CASH ON DELIVERY - ₹15 Handling Fee Only , Pay Rest On Delivery
                        </div>
                      </div>
                      {/* Solid Wallet Icon */}
                      <div className="shrink-0 pl-1">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-1 7h-3a1 1 0 0 1 0-2h3v2zm1-9.5A1.5 1.5 0 0 0 18.5 3H5a1 1 0 0 0 0 2h14a1 1 0 0 0 1-.5z"/>
                          <circle cx="17.5" cy="13" r="1.2" fill="#000" />
                        </svg>
                      </div>
                    </motion.button>

                    {/* Option 2: Door Delivery (100% Cash On Delivery) */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        onClose();
                        onPayOnDelivery();
                      }}
                      className="w-full bg-black hover:bg-neutral-900 text-white rounded-2xl p-4 flex items-center justify-between gap-3 text-left transition-all shadow-md group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Radio indicator */}
                        <div className="w-5 h-5 rounded-full border-2 border-white/80 shrink-0 group-hover:border-white transition-colors" />
                        <div className="font-sans font-semibold text-xs sm:text-sm leading-snug text-white">
                          Door Delivery - 100% Cash On Delivery
                        </div>
                      </div>
                      {/* Solid Delivery Truck Icon */}
                      <div className="shrink-0 pl-1">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18 6h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h1.08a3 3 0 0 0 5.84 0h4.16a3 3 0 0 0 5.84 0H21a1 1 0 0 0 1-1v-6l-4-4zm-11 12a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 7 18zm10 0a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 17 18zm1-7h-3V7.5h2.5l2 2.5V11z"/>
                        </svg>
                      </div>
                    </motion.button>
                  </div>

                  {/* Informational Note for Door Delivery */}
                  <div className="pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 font-sans font-medium text-center">
                    <Info size={13} className="shrink-0 text-neutral-500" />
                    <span>COD fee of ₹25 is added to Door Delivery</span>
                  </div>
                </div>

                {/* ── SECTION: PAYMENT METHODS ── */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-sans">
                      PAYMENT METHODS
                    </h4>
                    {/* Official Payment Logos (Mastercard, Google Pay, PhonePe, Paytm) */}
                    <div className="flex items-center gap-2 select-none">
                      {/* Mastercard */}
                      <div className="flex items-center" title="Mastercard">
                        <svg viewBox="0 0 38 24" className="h-4.5 w-auto" fill="none">
                          <circle cx="12" cy="12" r="10" fill="#EB001B" />
                          <circle cx="26" cy="12" r="10" fill="#F79E1B" fillOpacity="0.95" />
                          <path d="M19 4.35A9.97 9.97 0 0015.65 12 9.97 9.97 0 0019 19.65 9.97 9.97 0 0022.35 12 9.97 9.97 0 0019 4.35Z" fill="#FF5F00" />
                        </svg>
                      </div>

                      {/* Google Pay */}
                      <div className="flex items-center" title="Google Pay">
                        <svg viewBox="0 0 24 24" className="h-4.5 w-auto" fill="none">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#FFFFFF" />
                          <path d="M17.64 12.2c0-.64-.06-1.25-.16-1.84H12v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4" />
                          <path d="M12 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H3.94v2.33C5.43 15.98 8.48 18 12 18z" fill="#34A853" />
                          <path d="M6.97 10.71a5.41 5.41 0 010-3.42V4.96H3.94a9.01 9.01 0 000 8.08l3.03-2.33z" fill="#FBBC05" />
                          <path d="M12 5.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C16.46 2.92 14.43 2 12 2 8.48 2 5.43 4.02 3.94 6.96l3.03 2.33c.71-2.13 2.69-3.71 5.03-3.71z" fill="#EA4335" />
                        </svg>
                      </div>

                      {/* PhonePe */}
                      <div className="flex items-center" title="PhonePe">
                        <div className="w-5 h-5 rounded-full bg-[#5f259f] flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                          पे
                        </div>
                      </div>

                      {/* Paytm */}
                      <div className="flex items-center px-1.5 py-0.5 rounded-full bg-white border border-neutral-300 text-[10px] font-extrabold font-sans shadow-xs" title="Paytm">
                        <span className="text-[#002E6E]">Pay</span><span className="text-[#00BAF2]">tm</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 3: BUY NOW (PAY ONLINE) */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      onClose();
                      onPayOnline();
                    }}
                    className="w-full bg-black hover:bg-neutral-900 text-white rounded-2xl p-4 flex items-center justify-between gap-3 text-left transition-all shadow-md group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Radio indicator */}
                      <div className="w-5 h-5 rounded-full border-2 border-white/80 shrink-0 group-hover:border-white transition-colors" />
                      <div>
                        <div className="font-sans font-bold text-xs sm:text-sm uppercase tracking-wide text-white">
                          BUY NOW (PAY ONLINE)
                        </div>
                        <div className="text-[11px] text-neutral-300 font-sans font-normal mt-0.5">
                          Instant payments via UPI , Credit/Debit Cards , NetBanking , EMI , Wallets
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* ── 4. Bottom Footer Security Badge ── */}
                <div className="pt-2 pb-1 flex items-center justify-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-sans font-semibold uppercase tracking-wider">
                  <ShieldCheck size={16} className="text-neutral-700 dark:text-neutral-300 stroke-[2.2]" />
                  <span>100% SECURE PAYMENT</span>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BuyNowChoiceModal;
