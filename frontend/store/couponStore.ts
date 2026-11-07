'use client';

import { create } from 'zustand';

// ─── Active Coupon Codes ───────────────────────────────────────────────────────
export const VALID_COUPON    = 'ARGHYA10';
export const SPECIAL_COUPON_1 = 'MAHIKA05';
export const SPECIAL_COUPON_2 = 'AMAN05';

export const PROMO_COUPON_CODES = [
  'DISCOUNT01',
  'ARG07',
  'SIDDU02',
  'VANDANA485',
  'MAVIHS03',
  'MANAGE04',
] as const;

export type PromoCouponCode = typeof PROMO_COUPON_CODES[number];

export const isPromoCoupon = (code: string): boolean =>
  PROMO_COUPON_CODES.includes(code.trim().toUpperCase() as PromoCouponCode);

// Backward-compatibility alias
export const isNavratriCoupon = (code: string): boolean =>
  isPromoCoupon(code) || code.trim().toUpperCase() === SPECIAL_COUPON_1 || code.trim().toUpperCase() === SPECIAL_COUPON_2;

export const NAVRATRI5_PRICE_MAP: Record<string, { original: number; discounted: number; link?: string }> = {};

// ─── Unified discount resolver ────────────────────────────────────────────────
export const getDiscountedPrice = (slug: string, code: string | null, originalPrice?: number): number | null => {
  if (!code) return null;
  const upper = code.trim().toUpperCase();

  // 10% discount codes
  if (upper === VALID_COUPON && originalPrice) {
    return Math.round(originalPrice * 0.90);
  }

  // 5% discount codes
  if ((upper === SPECIAL_COUPON_1 || upper === SPECIAL_COUPON_2 || isPromoCoupon(upper)) && originalPrice) {
    return Math.round(originalPrice * 0.95);
  }

  return null;
};

export const getDiscountPercent = (originalPrice: number, discountedPrice: number): number => {
  if (!originalPrice || originalPrice <= discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// ─── Dedicated Razorpay Payment Links per Coupon ──────────────────────────────
export const getDedicatedCouponPaymentLink = (
  slug: string,
  productName?: string,
  couponCode?: string | null
): string | null => {
  return null;
};

// ─── Zustand Store ────────────────────────────────────────────────────────────
interface CouponState {
  isCouponActive: boolean;
  activeCouponCode: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

export const useCouponStore = create<CouponState>((set) => ({
  isCouponActive: false,
  activeCouponCode: null,
  applyCoupon: (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const isValid =
      trimmed === VALID_COUPON ||
      trimmed === SPECIAL_COUPON_1 ||
      trimmed === SPECIAL_COUPON_2 ||
      isPromoCoupon(trimmed);
    if (isValid) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('arghya_applied_coupon', trimmed);
      }
      set({ isCouponActive: true, activeCouponCode: trimmed });
      return true;
    }
    return false;
  },
  removeCoupon: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('arghya_applied_coupon');
    }
    set({ isCouponActive: false, activeCouponCode: null });
  },
}));
