'use client';

import { create } from 'zustand';

// ─── Legacy Coupon Codes (Fusion Set + Rangrez — original system) ─────────────
export const VALID_COUPON    = 'ARGHYA10';
export const SPECIAL_COUPON_1 = 'MAHIKA05';
export const SPECIAL_COUPON_2 = 'AMAN05';

// ─── Navratri 5% Coupon Codes ─────────────────────────────────────────────────
export const NAVRATRI_COUPON_CODES = [
  'DISCOUNT01',
  'ARG07',
  'SIDDU02',
  'VANDANA485',
  'MAVIHS03',
  'MANAGE04',
] as const;

export type NavratriCouponCode = typeof NAVRATRI_COUPON_CODES[number];

export const isNavratriCoupon = (code: string): boolean =>
  NAVRATRI_COUPON_CODES.includes(code.trim().toUpperCase() as NavratriCouponCode);

// ─── Legacy eligible slugs (ARGHYA10 only) ───────────────────────────────────
export const COUPON_ELIGIBLE_SLUGS = [
  'rangrez-chaniya-set',
  'the-prism-radiance-fusion-set',
  'the-saffron-aura-fusion-set',
];

// ─── Navratri 5% eligible slugs ──────────────────────────────────────────────
export const NAVRATRI5_ELIGIBLE_SLUGS = [
  'rangrez-chaniya-set',
  'the-prism-radiance-fusion-set',
  'the-saffron-aura-fusion-set',
  'plum-tie-shoulder-kurti',
  'royal-embroided-kurti',
  'navratri-rose-print-garbha-skirt',
  // Alias slugs for the Navratri Garbha Skirt collection
  'navratri-folk-design-garbha-skirt',
  'navratri-garba-blue-skirt',
  'raasrang-garba-skirt',
];

// ─── Legacy ARGHYA10 price map ────────────────────────────────────────────────
export const COUPON_PRICE_MAP: Record<string, { original: number; discounted: number }> = {
  'rangrez-chaniya-set':           { original: 2099, discounted: 1499 },
  'the-prism-radiance-fusion-set': { original: 799,  discounted: 719  },
  'the-saffron-aura-fusion-set':   { original: 799,  discounted: 719  },
};

// ─── Navratri 5% off price map (rounded to whole numbers) ────────────────────
// Calculation: Math.round(original * 0.95)
export const NAVRATRI5_PRICE_MAP: Record<string, { original: number; discounted: number }> = {
  'rangrez-chaniya-set':              { original: 2099, discounted: 1994 }, // 2099 × 0.95 = 1994.05
  'the-prism-radiance-fusion-set':    { original: 799,  discounted: 759  }, // 799  × 0.95 = 759.05
  'the-saffron-aura-fusion-set':      { original: 799,  discounted: 759  }, // 799  × 0.95 = 759.05
  'plum-tie-shoulder-kurti':          { original: 398,  discounted: 378  }, // 398  × 0.95 = 378.10
  'royal-embroided-kurti':            { original: 576,  discounted: 547  }, // 576  × 0.95 = 547.20
  'navratri-rose-print-garbha-skirt': { original: 891,  discounted: 846  }, // 891  × 0.95 = 846.45
  // Alias slugs resolve to the same Garbha Skirt price
  'navratri-folk-design-garbha-skirt': { original: 891, discounted: 846 },
  'navratri-garba-blue-skirt':         { original: 891, discounted: 846 },
  'raasrang-garba-skirt':              { original: 891, discounted: 846 },
};

// ─── Unified discount resolver ────────────────────────────────────────────────
export const getDiscountedPrice = (slug: string, code: string | null): number | null => {
  if (!code) return null;
  const upper = code.trim().toUpperCase();

  // Navratri 5% codes
  if (isNavratriCoupon(upper)) {
    return NAVRATRI5_PRICE_MAP[slug]?.discounted ?? null;
  }
  // Legacy ARGHYA10 / MAHIKA05 / AMAN05
  if (slug === 'rangrez-chaniya-set') {
    if (upper === SPECIAL_COUPON_1 || upper === SPECIAL_COUPON_2 || upper === VALID_COUPON) {
      return 1499;
    }
  } else if (upper === VALID_COUPON && COUPON_PRICE_MAP[slug]) {
    return COUPON_PRICE_MAP[slug].discounted;
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
  if (!couponCode) return null;
  const code = couponCode.trim().toUpperCase();
  const s = (slug || '').toLowerCase();
  const name = (productName || '').toLowerCase();

  const isRangrez = s === 'rangrez-chaniya-set' || name.includes('rangrez');
  const isPrism = s === 'the-prism-radiance-fusion-set' || name.includes('prism');
  const isSaffron = s === 'the-saffron-aura-fusion-set' || name.includes('saffron');
  const isPlum = s === 'plum-tie-shoulder-kurti' || name.includes('plum');
  const isRoyal = s === 'royal-embroided-kurti' || name.includes('royal');
  const isGarbhaSkirt =
    s === 'navratri-rose-print-garbha-skirt' ||
    s === 'navratri-folk-design-garbha-skirt' ||
    s === 'navratri-garba-blue-skirt' ||
    s === 'raasrang-garba-skirt' ||
    name.includes('garbha skirt') ||
    name.includes('navratri rose print');

  // ── SIDDU02 dedicated links ──
  if (code === 'SIDDU02') {
    if (isRangrez) return 'https://rzp.io/rzp/rangrezchaniyasiddu02';
    if (isPrism || isSaffron) return 'https://rzp.io/rzp/fusionkurtisiddu02';
    if (isPlum) return 'https://rzp.io/rzp/plumkurti02';
    if (isRoyal) return 'https://rzp.io/rzp/embroidedkurtisiddu02';
    if (isGarbhaSkirt) return 'https://rzp.io/rzp/navratriskirtsiddu02';
  }

  // ── ARG07 dedicated links ──
  if (code === 'ARG07') {
    if (isRangrez) return 'https://rzp.io/rzp/rangrezarg07';
    if (isPrism || isSaffron) return 'https://rzp.io/rzp/fusionkurtiarg07';
    if (isPlum) return 'https://rzp.io/rzp/plumkurtiarg07';
    if (isRoyal) return 'https://rzp.io/rzp/embroidedkurtiarg07';
    if (isGarbhaSkirt) return 'https://rzp.io/rzp/navratriskirtarg07';
  }

  // ── DISCOUNT01, VANDANA485, MAVIHS03, MANAGE04 & Standard 5% Discount dedicated links ──
  if (
    code === 'DISCOUNT01' ||
    code === 'VANDANA485' ||
    code === 'MAVIHS03' ||
    code === 'MANAGE04' ||
    isNavratriCoupon(code)
  ) {
    if (isGarbhaSkirt) return 'https://rzp.io/rzp/navratriskirtdiscount01';
    if (isRangrez) return 'https://rzp.io/rzp/rangrezdiscount01';
    if (isPrism || isSaffron) return 'https://rzp.io/rzp/fusionsetdiscount01';
    if (isPlum) return 'https://rzp.io/rzp/plumkurtidiscount01';
    if (isRoyal) return 'https://rzp.io/rzp/embroidedkurtidiscount01';
  }

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
      isNavratriCoupon(trimmed);
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
