'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VerticalProductCard } from '../components/VerticalProductCard';
import { HorizontalProductCard } from '../components/HorizontalProductCard';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { CartDrawer } from '../components/CartDrawer';
import { PaymentRedirectCard } from '../components/PaymentRedirectCard';
import { BuyNowChoiceModal } from '../components/modals/BuyNowChoiceModal';
import { CODChoiceModal } from '../components/modals/CODChoiceModal';
import { PayOnDeliveryModal } from '../components/modals/PayOnDeliveryModal';
import { BannerSlideshow, BannerSlide } from '../components/BannerSlideshow';
import { HomeCategoryBannerGrid } from '../components/home/HomeCategoryBannerGrid';
import { Product } from '../lib/api';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { ArghyaLargeText } from '../components/animations/ArghyaLargeText';
import {
  BRACELET_PRODUCTS,
  NECKLACE_PRODUCTS,
  ANKLET_PRODUCTS,
  PENDANT_PRODUCTS,
  KASHMIRI_EARRINGS_PRODUCTS,
  AMERICAN_DIAMONDS_PRODUCTS,
  OXIDIZED_EARRINGS_PRODUCTS,
  MODERN_PENDANTS_PRODUCTS,
  MODERN_EARRINGS_PRODUCTS,
  ANTI_TARNISH_BRACELETS_PRODUCTS,
} from '../lib/productsCatalog';

// ── Anti-Tarnish Collections ──────────────────────────────────────────────────
const ANTI_TARNISH_BRACELETS_COLLECTION: Product[] = (ANTI_TARNISH_BRACELETS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const KASHMIRI_EARRINGS_COLLECTION: Product[] = (KASHMIRI_EARRINGS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const AMERICAN_DIAMONDS_COLLECTION: Product[] = (AMERICAN_DIAMONDS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const OXIDIZED_EARRINGS_COLLECTION: Product[] = (OXIDIZED_EARRINGS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const MODERN_PENDANTS_COLLECTION: Product[] = (MODERN_PENDANTS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const MODERN_EARRINGS_COLLECTION: Product[] = (MODERN_EARRINGS_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

// ── 925 Pure Silver Collections ───────────────────────────────────────────────
const BRACELET_COLLECTION: Product[] = (BRACELET_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const NECKLACE_COLLECTION: Product[] = (NECKLACE_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const ANKLET_COLLECTION: Product[] = (ANKLET_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

const PENDANT_COLLECTION: Product[] = (PENDANT_PRODUCTS || []).map(p => ({
  ...p,
  is_featured: true,
}));

// ── Home Slideshow Slides ─────────────────────────────────────────────────────
const HOME_BANNER_SLIDES: BannerSlide[] = [
  {
    src: '/images/banners/banner_silver_payless_3x.png',
    srcSet: '/images/banners/banner_silver_payless.png 1024w, /images/banners/banner_silver_payless_2x.png 2048w, /images/banners/banner_silver_payless_3x.png 3072w',
    alt: 'Pay Less Flex More - Arghya 925 Pure Silver',
    bgColor: '#000000',
    href: '/products?category=Silver',
    title: 'Explore 925 Pure Silver',
  },
  {
    src: '/images/banners/banner_buy1get1_free_3x.png',
    srcSet: '/images/banners/banner_buy1get1_free.png 1024w, /images/banners/banner_buy1get1_free_2x.png 2048w, /images/banners/banner_buy1get1_free_3x.png 3072w',
    alt: 'BUY 1 GET 1 FREE - Special Jewellery Offer',
    bgColor: '#000000',
    href: '/products?category=AntiTarnish',
    title: 'BUY 1 GET 1 FREE Offer',
  },
  {
    src: '/images/banners/banner_buy_studs_199_3x.png',
    srcSet: '/images/banners/banner_buy_studs_199.png 1024w, /images/banners/banner_buy_studs_199_2x.png 2048w, /images/banners/banner_buy_studs_199_3x.png 3072w',
    alt: 'Buy Studs @ ₹199 - Proudly offering the best Prices & Quality in India',
    bgColor: '#050720',
    href: '/products?category=AntiTarnish&subcategory=ModernEarrings',
    title: 'Buy Studs @ ₹199',
  },
  {
    src: '/images/banners/banner_anti_tarnish_shop_collection_3x.png',
    srcSet: '/images/banners/banner_anti_tarnish_shop_collection.png 1024w, /images/banners/banner_anti_tarnish_shop_collection_2x.png 2048w, /images/banners/banner_anti_tarnish_shop_collection_3x.png 3072w',
    alt: 'Shop the collection - Arghya Anti-Tarnish Fine Jewelry',
    bgColor: '#65131f',
    href: '/products?category=AntiTarnish',
    title: 'Explore Anti-Tarnish',
  },
  {
    src: '/images/banners/banner_free_gifts_cat_3x.png',
    srcSet: '/images/banners/banner_free_gifts_cat.png 1024w, /images/banners/banner_free_gifts_cat_2x.png 2048w, /images/banners/banner_free_gifts_cat_3x.png 3072w',
    alt: 'Get Free Gifts on Order Above INR 299 - Hot Deals',
    bgColor: '#ffa2d1',
    href: '/products?category=HotDeals',
    title: 'Explore Hot Deals & Free Gifts',
  },
];

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('horizontal');
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowChoiceOpen, setIsBuyNowChoiceOpen] = useState(false);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);
  const [buyNowChoiceProduct, setBuyNowChoiceProduct] = useState<Product | null>(null);

  const handleBuyNow = (product: Product) => {
    setBuyNowChoiceProduct(product);
    setIsBuyNowChoiceOpen(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-x-hidden bg-white dark:bg-black text-black dark:text-white transition-colors">
      <CartDrawer />
      <PaymentRedirectCard
        isOpen={buyNowProduct !== null}
        onClose={() => setBuyNowProduct(null)}
        product={buyNowProduct}
      />
      <BuyNowChoiceModal
        isOpen={isBuyNowChoiceOpen && buyNowChoiceProduct !== null}
        onClose={() => setIsBuyNowChoiceOpen(false)}
        product={buyNowChoiceProduct as Product}
        selectedSize="Free Size"
        onPayOnline={() => {
          setIsBuyNowChoiceOpen(false);
          setBuyNowProduct(buyNowChoiceProduct);
        }}
        onCashOnDelivery={() => {
          setIsBuyNowChoiceOpen(false);
          setIsCODModalOpen(true);
        }}
        onPayOnDelivery={() => {
          setIsBuyNowChoiceOpen(false);
          setIsPODModalOpen(true);
        }}
      />
      <CODChoiceModal
        isOpen={isCODModalOpen && buyNowChoiceProduct !== null}
        onClose={() => setIsCODModalOpen(false)}
        product={buyNowChoiceProduct as Product}
      />
      <PayOnDeliveryModal
        isOpen={isPODModalOpen && buyNowChoiceProduct !== null}
        onClose={() => setIsPODModalOpen(false)}
        product={buyNowChoiceProduct as Product}
        selectedSize="Free Size"
      />

      {/* ── 1. TOP: Endless Slideshow as Hero ── */}
      <section className="w-full !mt-0">
        <BannerSlideshow
          slides={HOME_BANNER_SLIDES}
          intervalMs={3500}
          priorityFirst={true}
        />
      </section>

      {/* ── 2. White Label Below Slideshow ── */}
      <div className="w-full bg-white text-black border-y border-neutral-200/90 dark:bg-white dark:text-black dark:border-neutral-200 py-2 sm:py-2.5 px-4 text-center select-none shadow-xs !mt-0">
        <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] sm:tracking-[0.28em] uppercase text-neutral-900 flex items-center justify-center gap-2">
          <span>Happily Served 1000+ Plus Fashion Lovers</span>
        </p>
      </div>

      <div className="space-y-16 sm:space-y-20">
        {/* ── 3. Category Banner Grid (Anti-Tarnish, 925 Silver, Buy 2 @ 499, Hot Deals, Quality) ── */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05}>
            <HomeCategoryBannerGrid />
          </ScrollReveal>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════════
            ── SECTION I: ANTI-TARNISH PRODUCTS CATALOGUE (FIRST ON SCROLL) ──
            All types of Anti-Tarnish products listed first
            ═════════════════════════════════════════════════════════════════════════ */}
        <div id="anti-tarnish-catalogue" className="space-y-14 sm:space-y-16">
          {/* Anti-Tarnish Super-Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#200508] via-[#3d0a12] to-[#1a0406] text-white border border-[#52101b] shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] font-mono font-bold text-rose-300">
                    Waterproof • Daily Wear • Non-Fade
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                    Anti-Tarnish Collection
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                    Explore all categories of waterproof, skin-friendly anti-tarnish jewellery crafted to never lose its radiance.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                  <Link
                    href="/products?category=AntiTarnish"
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 1. Anti-Tarnish Bracelets Collection */}
          <section id="anti-tarnish-bracelets-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Premium Gold-Tone Finish
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Anti-Tarnish Bracelets Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=Bracelets"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Bracelets ({ANTI_TARNISH_BRACELETS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {ANTI_TARNISH_BRACELETS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {ANTI_TARNISH_BRACELETS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 2. Kashmiri Earrings Collection */}
          <section id="kashmiri-earrings-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Kashmiri Heritage Collection
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Kashmiri Earrings Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=Kashmiri+Earrings"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Kashmiri Earrings ({KASHMIRI_EARRINGS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {KASHMIRI_EARRINGS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {KASHMIRI_EARRINGS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 2. American Diamonds Collection */}
          <section id="american-diamonds-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Sparkling AD Sets
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    American Diamonds Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=American+Diamonds"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All American Diamonds ({AMERICAN_DIAMONDS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {AMERICAN_DIAMONDS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {AMERICAN_DIAMONDS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 3. Oxidized Earrings Collection */}
          <section id="oxidized-earrings-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Handcrafted Finish
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Oxidized Earrings Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=Oxidized+Earrings"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Oxidized Earrings ({OXIDIZED_EARRINGS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {OXIDIZED_EARRINGS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {OXIDIZED_EARRINGS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 4. Modern Pendants Collection */}
          <section id="modern-pendants-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Modern Style
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Modern Pendants Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=Modern+Pendants"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Modern Pendants ({MODERN_PENDANTS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {MODERN_PENDANTS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {MODERN_PENDANTS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 5. Modern Earrings Collection */}
          <section id="modern-earrings-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Chic & Contemporary
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Modern Earrings Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=AntiTarnish&subcategory=Modern+Earrings"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Modern Earrings ({MODERN_EARRINGS_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {MODERN_EARRINGS_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {MODERN_EARRINGS_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════════
            ── SECTION II: 925 PURE SILVER CATALOGUE (FOLLOWS ANTI-TARNISH) ──
            Displayed after the complete Anti-Tarnish catalogue has finished
            ═════════════════════════════════════════════════════════════════════════ */}
        <div id="pure-silver-catalogue" className="space-y-14 sm:space-y-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          {/* 925 Pure Silver Super-Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-black text-white border border-neutral-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] font-mono font-bold text-neutral-400">
                    Certified Purity • Timeless Elegance
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                    925 Pure Silver Collection
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                    Handcrafted certified 925 sterling silver bracelets, necklaces, anklets and pendants designed for everlasting beauty.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                  <Link
                    href="/products?category=Silver"
                    className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-sm"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 1. Bracelets Collection */}
          <section id="bracelets-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver &amp; Anti-Tarnish
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Bracelets Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=Silver&subcategory=Bracelets"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Bracelets ({BRACELET_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {BRACELET_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {BRACELET_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 2. Necklace Collection */}
          <section id="necklace-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver &amp; Anti-Tarnish
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    Necklace Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=Silver&subcategory=Necklaces"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Necklaces ({NECKLACE_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {NECKLACE_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {NECKLACE_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 3. 925 Silver Anklets Collection */}
          <section id="anklet-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver &amp; Anti-Tarnish
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                    925 Silver Anklets Collection
                  </h3>
                </div>
                <Link
                  href="/products?category=Silver&subcategory=Anklets"
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Anklets ({ANKLET_COLLECTION.length}) →
                </Link>
              </div>
            </ScrollReveal>

            {viewMode === 'horizontal' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {ANKLET_COLLECTION.map((product, idx) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {ANKLET_COLLECTION.map((product, idx) => (
                  <VerticalProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onBuyNow={handleBuyNow}
                    isCouponActive={false}
                    activeCouponCode={null}
                  />
                ))}
              </div>
            )}
          </section>

          {/* 4. Pendants Collection */}
          {PENDANT_COLLECTION.length > 0 && (
            <section id="pendants-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-2">
              <ScrollReveal direction="up" delay={0.05}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                      Pure Silver &amp; Anti-Tarnish
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white mt-0.5">
                      Pendants Collection
                    </h3>
                  </div>
                  <Link
                    href="/products?category=Silver&subcategory=Pendants"
                    className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                  >
                    View All Pendants ({PENDANT_COLLECTION.length}) →
                  </Link>
                </div>
              </ScrollReveal>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {PENDANT_COLLECTION.map((product, idx) => (
                    <HorizontalProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                      onBuyNow={handleBuyNow}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {PENDANT_COLLECTION.map((product, idx) => (
                    <VerticalProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                      onBuyNow={handleBuyNow}
                      isCouponActive={false}
                      activeCouponCode={null}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Large Typography Footer Pre-section */}
      <ArghyaLargeText />
    </div>
  );
}
