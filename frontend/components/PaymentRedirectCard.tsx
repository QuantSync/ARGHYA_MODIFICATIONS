'use client';

/**
 * PaymentRedirectCard.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A standalone modal widget that intercepts the "Buy Now" action on any
 * product card (Home screen VerticalProductCard or Catalogue page).
 *
 * Behaviour
 * ─────────
 *  • Blurs the entire background when open.
 *  • Has a Razorpay-branded blue theme (not the site amber/burgundy palette).
 *  • Shows the product name + price and tells the user they will be redirected
 *    to Razorpay for payment.
 *  • Two actions:
 *      Cancel / ✕  →  closes the modal with no side-effects.
 *      Proceed     →  calls the Razorpay checkout flow (bypasses cart).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap, Lock, CreditCard, AlertCircle, Tag, CheckCircle } from 'lucide-react';
import { Product, api } from '../lib/api';
import { isNavratriCoupon, NAVRATRI5_PRICE_MAP, useCouponStore, getDedicatedCouponPaymentLink } from '../store/couponStore';

// ─── Razorpay SDK Loader ─────────────────────────────────────────────────────
const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

// ─── Types ───────────────────────────────────────────────────────────────────
interface PaymentRedirectCardProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Called when user dismisses the modal */
  onClose: () => void;
  /** The product being purchased directly — bypasses the cart entirely */
  product: Product | null;
  /** Optional variant price override */
  variantPrice?: number;
  /**
   * The currently active coupon code.
   * Controls which Razorpay payment link is used for coupon-eligible products.
   */
  activeCouponCode?: string | null;
}

// ─── Component ───────────────────────────────────────────────────────────────
export const PaymentRedirectCard: React.FC<PaymentRedirectCardProps> = ({
  isOpen,
  onClose,
  product,
  variantPrice,
  activeCouponCode = null,
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputCoupon, setInputCoupon] = useState('');
  const [modalCouponCode, setModalCouponCode] = useState<string | null>(activeCouponCode || null);
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg(null);
      setModalCouponCode(activeCouponCode || null);
      setInputCoupon('');
      setCouponFeedback(null);
      setIsPriceAnimating(false);
    }
  }, [isOpen, activeCouponCode]);

  if (!product) return null;

  const currentCode = modalCouponCode || activeCouponCode || null;
  const navratriActive = !!currentCode && (isNavratriCoupon(currentCode) || currentCode.trim().toUpperCase() === 'DISCOUNT01');

  // Show the discounted price in the modal when coupon is active
  const rawPrice = variantPrice ?? Number(product.price);
  const effectivePrice =
    navratriActive && product.slug && NAVRATRI5_PRICE_MAP[product.slug] !== undefined
      ? (NAVRATRI5_PRICE_MAP[product.slug]?.discounted ?? rawPrice)
      : rawPrice;
  const displayPrice = effectivePrice.toLocaleString('en-IN');

  const handleApplyCouponInModal = () => {
    const trimmed = inputCoupon.trim().toUpperCase();
    if (isNavratriCoupon(trimmed) || trimmed === 'DISCOUNT01' || trimmed === 'ARG07') {
      setIsPriceAnimating(true);
      setModalCouponCode(trimmed);
      useCouponStore.getState().applyCoupon(trimmed);

      const targetLink = getDedicatedCouponPaymentLink(product.slug, product.name, trimmed);
      if (targetLink) {
        setCouponFeedback({
          type: 'success',
          message: `🎉 ${trimmed} applied! Discounted price active. Redirecting...`,
        });
        setTimeout(() => {
          window.location.href = targetLink;
        }, 1100);
      } else {
        setCouponFeedback({
          type: 'success',
          message: `🎉 Coupon ${trimmed} applied! 5% discount activated.`,
        });
      }
    } else {
      setCouponFeedback({
        type: 'error',
        message: 'Invalid or inapplicable coupon code.',
      });
    }
  };

  const handleProceed = async () => {
    setStatus('loading');
    setErrorMsg(null);

    // 1. Check dedicated coupon payment link (ARG07, DISCOUNT01, etc.)
    const dedicatedLink = getDedicatedCouponPaymentLink(product.slug, product.name, currentCode);
    if (dedicatedLink) {
      window.location.href = dedicatedLink;
      return;
    }

    // ── Direct Razorpay payment link redirects (per-product) ────────────────
    //
    const RAZORPAY_LINKS: Record<string, string> = {
      // ── Hot Deals & Specials ───────────────────────────────────────────────
      'mystery-jar': 'https://rzp.io/rzp/mysteryjar',
      'mystery jar': 'https://rzp.io/rzp/mysteryjar',

      // ── Hot Deals Combos ──────────────────────────────────────────────────
      'meadow-dance-butterfly-combo':  'https://rzp.io/rzp/meadowdancebutterflycombo',
      'urban-rebel-cross-combo':       'https://rzp.io/rzp/urbanrebelcrosscombo',
      'black-pink-heart-station-combo': 'https://rzp.io/rzp/blackpinkheartstationcombo',
      'golden-twin-loop-combo':        'https://rzp.io/rzp/goldentwinloopcombo',
      'golden-pretty-combo':           'https://rzp.io/rzp/goldenpreetycombo',
      'golden-pearl-hoop-combo':       'https://rzp.io/rzp/goldenpearlandhoopcombo',
      'white-red-petal-studs-combo':   'https://rzp.io/rzp/whiteandredpetalstudscombo',

      // ── Anti Tarnish Modern Earrings ──────────────────────────────────────
      'celeste-pearl-cascade-earrings':              'https://rzp.io/rzp/celestepearlcascadeearings',
      'crystal-square-radiance-studs':               'https://rzp.io/rzp/crystalsquareradiancestuds',
      'starlight-rhinestone-fringe-earrings':        'https://rzp.io/rzp/starlightrhinestonefringeearin',
      'heartbeat-crystal-loop-earrings':             'https://rzp.io/rzp/heartbeatcrystalloopearrings',
      'emerald-aura-teardrop-earrings':              'https://rzp.io/rzp/emeraldaurateardropearrings',
      'golden-pearl-halo-earrings':                  'https://rzp.io/rzp/goldenpearlhaloearrings',
      'blush-blossom-crystal-hoop-earrings':         'https://rzp.io/rzp/blushblossomcrystalhoopearring',
      'golden-butterfly-dreams-gold-plated-earrings': 'https://rzp.io/rzp/goldenbutterflydreamsgoldplate',
      'turquoise-charm-crystal-drops':               'https://rzp.io/rzp/turquoisecharmcrystaldrops',
      'pearl-bow-elegance-hoop-earrings':            'https://rzp.io/rzp/pearlbowelegancehoopearings',
      'blush-blossom-pearl-earrings':                'https://rzp.io/rzp/blushblossompearlearrings',
      'golden-pearl-loop-studs':                     'https://rzp.io/rzp/goldenpearlloopstuds',
      'crystal-cascade-drop-earrings':               'https://rzp.io/rzp/crystalcascadedrop',
      'ivory-petal-bloom-earrings':                  'https://rzp.io/rzp/ivorypetalbloomearings',
      'ruby-maroon-petal-studs':                     'https://rzp.io/rzp/rubymaroonpetalstuds',
      'crystal-butterfly-gleam-studs':               'https://rzp.io/rzp/crystalbutterflygleamstuds',
      'crimson-arc-statement-earrings':              'https://rzp.io/rzp/crimsonarcstatementearrings',
      'royal-pearl-crystal-hoops':                   'https://rzp.io/rzp/royalpearlcrystalhoops',
      'pearl-bow-sparkle-studs':                     'https://rzp.io/rzp/pearlbowsparklestuds',
      'midnight-triple-heart-drops':                 'https://rzp.io/rzp/midnighttripleheartdrops',


      // ── 925 Pure Silver Bracelets ──────────────────────────────────────────
      '925-sterling-silver-purple-stone-bracelet': 'https://rzp.io/rzp/puresilverpurplestonedbraclet',
      '925 pure silver purple stoned bracelet': 'https://rzp.io/rzp/puresilverpurplestonedbraclet',
      '925-sterling-silver-toggle-bracelet': 'https://rzp.io/rzp/puresilvertogglebracelet',
      '925 sterling silver toggle bracelet': 'https://rzp.io/rzp/puresilvertogglebracelet',
      '925-sterling-silver-turquoise-clover-bracelet': 'https://rzp.io/rzp/puresilverturquoise',
      'pure silver turquoise clover bracelet': 'https://rzp.io/rzp/puresilverturquoise',
      '925-sterling-silver-heart-charm-bracelet': 'https://rzp.io/rzp/puresilverheartcharmbraclet',
      'pure silver heart charm bracelet': 'https://rzp.io/rzp/puresilverheartcharmbraclet',
      '925-sterling-silver-star-bracelet': 'https://rzp.io/rzp/puresilverstarbracelet',
      'pure sterling silver star bracelet': 'https://rzp.io/rzp/puresilverstarbracelet',
      '925-sterling-silver-butterfly-bracelet': 'https://rzp.io/rzp/puresilverbutterflybracelet',
      'pure sterling silver butterfly bracelet': 'https://rzp.io/rzp/puresilverbutterflybracelet',

      // ── 925 Pure Silver Anklets ─────────────────────────────────────────────
      '925-triple-layer-silver-beaded-anklet': 'https://rzp.io/rzp/triplelayersilverbeadedanklet',
      '925-celestial-star-charm-anklet': 'https://rzp.io/rzp/celestialstarcharmanklet',
      '925-black-beaded-sterling-silver-anklet': 'https://rzp.io/rzp/blackbeadedsterlingsilverneckl',
      '925-crystal-drop-silver-anklet': 'https://rzp.io/rzp/crystaldropsilveranklet',
      '925-three-charm-silver-anklet': 'https://rzp.io/rzp/threecharmsilveranklet',
      '925-minimalist-silver-beaded-anklet': 'https://rzp.io/rzp/minimalistsilverbeadedanklet',
      '925-double-chain-silver-bead-anklet': 'https://rzp.io/rzp/doublechainsilverbeadanklet',
      '925-double-layer-black-beaded-anklet': 'https://rzp.io/rzp/doublelayerblackbeadedanklet',
      '925-double-evil-eye-silver-anklet': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
      'doubleeveileyesilvei': 'https://rzp.io/rzp/doubleeveileyesilveranklet',
      '925-minimal-blue-evil-eye-anklet': 'https://rzp.io/rzp/minimalblueeveileyeanklet',
      '925-evil-eye-black-beaded-anklet': 'https://rzp.io/rzp/evileyeblackbeadanklet',
      '925-traditional-silver-ghungroo-anklet': 'https://rzp.io/rzp/traditionalsilverghungroo',

      // ── 925 Pure Silver Necklaces ──────────────────────────────────────────
      '925-midnight-beads-necklace': 'https://rzp.io/rzp/midnightbeadsnecklace',
      '925-sterling-silver-blue-evil-eye-necklace': 'https://rzp.io/rzp/silverevileyenecklace',
      '925-sterling-silver-triple-heart-love-necklace': 'https://rzp.io/rzp/silvertripleheartnecklace',
      '925-silver-bead-cascade-necklace': 'https://rzp.io/rzp/silverbeadcascadenecklace',
      '925-triple-silver-bead-necklace': 'https://rzp.io/rzp/trioballnecklace',
      '925-silver-beaded-elegance-necklace': 'https://rzp.io/rzp/silverbeadednecklace',
      '925-tiny-love-heart-necklace': 'https://rzp.io/rzp/tinyloveheartnecklace',
      '925-butterfly-bliss-necklace': 'https://rzp.io/rzp/butterflyblissnecklace',
      '925-celestial-charm-necklace': 'https://rzp.io/rzp/celestialcharmnecklace',
      '925-celestial-moon-star-necklace': 'https://rzp.io/rzp/moonstarnecklace',
    };

    const directLink =
      (product as any).razorpay_url ||
      (product.slug && RAZORPAY_LINKS[product.slug]) ||
      RAZORPAY_LINKS[
        Object.keys(RAZORPAY_LINKS).find(
          (k) => k.replace(/-/g, ' ').toLowerCase() === product.name.toLowerCase()
        ) || ''
      ];

    if (directLink) {
      window.location.href = directLink;
      return;
    }

    try {
      const orderPayload = {
        customer: {
          fullName: 'Guest Buyer',
          email: 'care.arghya@gmail.com',
          phone: '9000000000',
          address: 'To be collected',
          city: 'Kolkata',
          state: 'West Bengal',
          postalCode: '700001',
        },
        shippingAddress: {
          line1: 'To be collected',
          city: 'Kolkata',
          state: 'West Bengal',
          postalCode: '700001',
          country: 'India',
        },
        items: [
          {
            product_id: product.id,
            product_name: product.name,
            quantity: 1,
            price: effectivePrice,
          },
        ],
        subtotal: effectivePrice,
        shippingFee: 0,
        taxAmount: 0,
      };

      const orderRes = await api.post('/orders', orderPayload);
      const createdOrder = orderRes.data.data;

      const paymentRes = await api.post('/payments/initiate', {
        gateway: 'razorpay',
        orderId: createdOrder.id,
      });

      const { paymentData } = paymentRes.data.data;

      if (!paymentData?.id) throw new Error('Invalid payment data received from server.');
      if (paymentData.id.includes('mock') || paymentData.id.includes('demo')) {
        throw new Error('Backend is using a demo Razorpay key. Please restart with live keys.');
      }

      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) throw new Error('Razorpay SDK failed to load. Check your connection.');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_live_TgZrGbzaYRBa90',
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'ARGHYA',
        description: `Buy Now — ${product.name}`,
        order_id: paymentData.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await api.post('/payments/verify/razorpay', {
              orderId: createdOrder.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            if (verifyRes.data.success) {
              setStatus('success');
              setTimeout(onClose, 2200);
            } else {
              setStatus('error');
              setErrorMsg('Payment verification failed. Please contact support.');
            }
          } catch (err: any) {
            setStatus('error');
            setErrorMsg(err.response?.data?.error?.message || 'Transaction verification failed.');
          }
        },
        prefill: { name: 'Guest Buyer', email: 'care.arghya@gmail.com', contact: '9000000000' },
        theme: { color: '#2563EB' },
        modal: {
          ondismiss: () => setStatus('idle'),
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.on('payment.failed', (resp: any) => {
        setStatus('error');
        setErrorMsg(resp.error?.description || 'Payment failed. Please try again.');
      });
      rzpInstance.open();
      // Close our modal — Razorpay native checkout takes over
      onClose();
    } catch (err: any) {
      console.error('[PaymentRedirectCard]', err);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="rzp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60"
            style={{
              backdropFilter: 'blur(12px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(12px) saturate(1.5)',
            }}
            aria-hidden="true"
          />

          {/* ── Card ─────────────────────────────────────────────────────── */}
          <motion.div
            key="rzp-card"
            role="dialog"
            aria-modal="true"
            aria-label="Razorpay Payment Redirect"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 32 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15, 15, 15, 0.85)',
                backdropFilter: 'blur(24px) saturate(1.8)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                boxShadow:
                  '0 0 0 1px rgba(255, 255, 255, 0.06), 0 24px 64px rgba(0, 0, 0, 0.85), 0 0 60px rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* White glow top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 40%, #ffffff 50%, rgba(255,255,255,0.6) 60%, transparent)',
                }}
              />

              {/* Radial white ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 p-7 sm:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-black font-black text-lg select-none"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
                        boxShadow: '0 4px 14px rgba(255, 255, 255, 0.25)',
                      }}
                    >
                      R
                    </div>
                    <div>
                      <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">Secured by</p>
                      <p className="text-base font-extrabold text-white leading-none">Razorpay</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    aria-label="Close payment redirect"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Main message */}
                <div className="space-y-2 text-center">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Zap size={36} className="mx-auto mb-3 text-white" strokeWidth={2} />
                    <h2 className="font-bold text-xl text-white leading-tight">You&apos;re being redirected to</h2>
                    <p
                      className="font-black text-2xl"
                      style={{
                        background: 'linear-gradient(90deg, #ffffff, #d4d4d4 60%, #a3a3a3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Razorpay Payment Gateway
                    </p>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto"
                  >
                    You are about to securely complete your purchase for
                  </motion.p>
                </div>

                {/* Product pill */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.18, type: 'spring', stiffness: 300 }}
                  className="rounded-xl p-4 flex items-center justify-between gap-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate">{product.name}</p>
                    {product.category && (
                      <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-widest truncate mt-0.5">
                        {product.category}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <motion.p
                      key={displayPrice}
                      initial={isPriceAnimating ? { scale: 1.35, color: '#4ade80' } : false}
                      animate={{ scale: 1, color: '#ffffff' }}
                      transition={{ duration: 0.45 }}
                      className="font-black text-lg"
                    >
                      &#8377;{displayPrice}
                    </motion.p>
                    {product.compare_at_price && (
                      <p className="text-slate-500 text-xs line-through">
                        &#8377;{Number(product.compare_at_price).toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Error / Success banner */}
                <AnimatePresence>
                  {status === 'error' && errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2 rounded-xl p-3 text-sm text-rose-300"
                      style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
                    >
                      <AlertCircle size={15} className="mt-0.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 rounded-xl p-3 text-sm text-emerald-300"
                      style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
                    >
                      <ShieldCheck size={15} className="shrink-0" />
                      <span>Payment successful! Thank you for your order &#127881;</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-5 text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1.5"><Lock size={11} />256-bit SSL</span>
                  <span className="flex items-center gap-1.5"><CreditCard size={11} />UPI &middot; Cards &middot; NetBanking</span>
                  <span className="flex items-center gap-1.5"><ShieldCheck size={11} />PCI DSS</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    disabled={status === 'loading'}
                    className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors disabled:opacity-50"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#94a3b8',
                    }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(255,255,255,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleProceed}
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-[2] py-3 rounded-xl text-sm font-black tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        status === 'loading'
                          ? 'rgba(255,255,255,0.8)'
                          : '#ffffff',
                      color: '#000000',
                      boxShadow: '0 4px 18px rgba(255,255,255,0.25)',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Connecting&hellip;
                      </>
                    ) : (
                      <>
                        <Zap size={15} strokeWidth={2.5} className="text-black" />
                        Proceed to Pay
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Fine print */}
                <p className="text-center text-[10px] text-slate-600 leading-relaxed">
                  By proceeding, you agree to Razorpay&apos;s&nbsp;
                  <a
                    href="https://razorpay.com/terms/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-slate-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                  . Your payment is processed securely and ARGHYA does not store card details.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
