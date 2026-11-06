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
import { PRODUCTS_CATALOG, NECKLACE_PRODUCTS, ANKLET_PRODUCTS } from '../lib/productsCatalog';

// ── 925 Silver Product Lists ──────────────────────────────────────────────────
const FEATURED_JEWELRY: Product[] = [
  { ...PRODUCTS_CATALOG['925-sterling-silver-star-bracelet'], is_featured: true },
  { ...PRODUCTS_CATALOG['925-sterling-silver-purple-stone-bracelet'], is_featured: true },
  { ...PRODUCTS_CATALOG['925-sterling-silver-butterfly-bracelet'], is_featured: true },
  { ...PRODUCTS_CATALOG['925-sterling-silver-toggle-bracelet'], is_featured: true },
  { ...PRODUCTS_CATALOG['925-sterling-silver-turquoise-clover-bracelet'], is_featured: true },
  { ...PRODUCTS_CATALOG['925-sterling-silver-heart-charm-bracelet'], is_featured: true },
];

const NECKLACE_COLLECTION: Product[] = NECKLACE_PRODUCTS.map(p => ({
  ...p,
  is_featured: true,
}));

const ANKLET_COLLECTION: Product[] = ANKLET_PRODUCTS.map(p => ({
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
  const [necklaceViewMode, setNecklaceViewMode] = useState<ViewMode>('horizontal');
  const [ankletViewMode, setAnkletViewMode] = useState<ViewMode>('horizontal');
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

      {/* ── 1. TOP: Endless 3-Banner Slideshow as Hero (replaces old BUY 2 @ 2,299 black banner) ── */}
      <section className="w-full !mt-0">
        <BannerSlideshow
          slides={HOME_BANNER_SLIDES}
          intervalMs={3500}
          priorityFirst={true}
        />
      </section>

      {/* ── Label 2: White Label Below Slideshow (Image 1 Red Zone) ── */}
      <div className="w-full bg-white text-black border-y border-neutral-200/90 dark:bg-white dark:text-black dark:border-neutral-200 py-2 sm:py-2.5 px-4 text-center select-none shadow-xs !mt-0">
        <p className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.22em] sm:tracking-[0.28em] uppercase text-neutral-900 flex items-center justify-center gap-2">
          <span>Happily Served 1000+ Customers</span>
        </p>
      </div>

      <div className="space-y-16 sm:space-y-20">
        {/* ── 3. Category Banner Grid (Anti-Tarnish, 925 Silver, Buy 2 @ 499, Hot Deals, Quality) ── */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05}>
            <HomeCategoryBannerGrid />
          </ScrollReveal>
        </section>

        {/* ── 4. 925 Silver Bracelets Collection ── */}
        <section id="bracelets-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver &amp; Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">Bracelets</h2>
              </div>
              <Link href="/products?category=bracelets" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Bracelets →
              </Link>
            </div>
          </ScrollReveal>

          <ViewToggle viewMode={viewMode} onChange={setViewMode} />

          {viewMode === 'horizontal' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {FEATURED_JEWELRY.map((product, idx) => (
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
              {FEATURED_JEWELRY.map((product, idx) => (
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

        {/* ── 5. Necklace Collection ── */}
        <section id="necklace-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver &amp; Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">Necklace</h2>
              </div>
              <Link href="/products?category=necklaces" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Necklaces →
              </Link>
            </div>
          </ScrollReveal>

          <ViewToggle viewMode={necklaceViewMode} onChange={setNecklaceViewMode} />

          {necklaceViewMode === 'horizontal' ? (
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

        {/* ── 6. 925 Silver Anklets Collection ── */}
        <section id="anklet-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver &amp; Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">925 Silver Anklets</h2>
              </div>
              <Link href="/products?category=anklets" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Anklets →
              </Link>
            </div>
          </ScrollReveal>

          <ViewToggle viewMode={ankletViewMode} onChange={setAnkletViewMode} />

          {ankletViewMode === 'horizontal' ? (
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
      </div>

      {/* Large Typography Footer Pre-section */}
      <ArghyaLargeText />
    </div>
  );
}
