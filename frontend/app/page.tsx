'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VerticalProductCard } from '../components/VerticalProductCard';
import { HorizontalProductCard } from '../components/HorizontalProductCard';
import { ViewToggle, ViewMode } from '../components/ViewToggle';
import { CartDrawer } from '../components/CartDrawer';
import { PaymentRedirectCard } from '../components/PaymentRedirectCard';
import { ValuePillarsWidget } from '../components/ValuePillarsWidget';
import { JewelryHeroPanel } from '../components/home/JewelryHeroPanel';
import { Product } from '../lib/api';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { ArghyaLargeText } from '../components/animations/ArghyaLargeText';
import { PRODUCTS_CATALOG, NECKLACE_PRODUCTS, ANKLET_PRODUCTS } from '../lib/productsCatalog';

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

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('horizontal');
  const [necklaceViewMode, setNecklaceViewMode] = useState<ViewMode>('horizontal');
  const [ankletViewMode, setAnkletViewMode] = useState<ViewMode>('horizontal');
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 overflow-x-hidden bg-white dark:bg-black text-black dark:text-white transition-colors">
      <CartDrawer />
      <PaymentRedirectCard
        isOpen={buyNowProduct !== null}
        onClose={() => setBuyNowProduct(null)}
        product={buyNowProduct}
      />

      {/* ── 1. Top Hero Screen Panel (Image 1 Strictly) ── */}
      <JewelryHeroPanel />

      <div className="space-y-16 sm:space-y-20">
        {/* Modular Value Pillars Widget */}
        <section className="relative z-10">
          <ScrollReveal direction="up">
            <ValuePillarsWidget />
          </ScrollReveal>
        </section>

        {/* ── Bracelets Collection Section ── */}
        <section id="bracelets-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver & Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">Bracelets Collection</h2>
              </div>
              <Link href="/products?category=bracelets" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Bracelets →
              </Link>
            </div>
          </ScrollReveal>

          {/* Centered Horizontal / Vertical View Toggle */}
          <ViewToggle viewMode={viewMode} onChange={setViewMode} />

          {viewMode === 'horizontal' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {FEATURED_JEWELRY.map((product, idx) => (
                <HorizontalProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onBuyNow={setBuyNowProduct}
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
                  onBuyNow={setBuyNowProduct}
                  isCouponActive={false}
                  activeCouponCode={null}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Necklace Collection Section (Directly BELOW Bracelets Collection) ── */}
        <section id="necklace-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver & Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">Necklace Collection</h2>
              </div>
              <Link href="/products?category=necklaces" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Necklaces →
              </Link>
            </div>
          </ScrollReveal>

          {/* Centered Horizontal / Vertical View Toggle for Necklace Collection */}
          <ViewToggle viewMode={necklaceViewMode} onChange={setNecklaceViewMode} />

          {necklaceViewMode === 'horizontal' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {NECKLACE_COLLECTION.map((product, idx) => (
                <HorizontalProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onBuyNow={setBuyNowProduct}
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
                  onBuyNow={setBuyNowProduct}
                  isCouponActive={false}
                  activeCouponCode={null}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── 925 Silver Anklets Collection Section (Directly BELOW Necklace Collection) ── */}
        <section id="anklet-collection" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-4">
          <ScrollReveal direction="up" delay={0.05}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">Pure Silver & Anti-Tarnish</span>
                <h2 className="font-serif text-3xl font-bold text-black dark:text-white">925 Silver Anklets Collection</h2>
              </div>
              <Link href="/products?category=anklets" className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0">
                View All Anklets →
              </Link>
            </div>
          </ScrollReveal>

          {/* Centered Horizontal / Vertical View Toggle for Anklets Collection */}
          <ViewToggle viewMode={ankletViewMode} onChange={setAnkletViewMode} />

          {ankletViewMode === 'horizontal' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {ANKLET_COLLECTION.map((product, idx) => (
                <HorizontalProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onBuyNow={setBuyNowProduct}
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
                  onBuyNow={setBuyNowProduct}
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
