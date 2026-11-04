'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { VerticalProductCard }   from '../../components/VerticalProductCard';
import { HorizontalProductCard } from '../../components/HorizontalProductCard';
import { ViewToggle, ViewMode }  from '../../components/ViewToggle';
import { CartDrawer }            from '../../components/CartDrawer';
import { PaymentRedirectCard }   from '../../components/PaymentRedirectCard';
import { BuyNowChoiceModal }     from '../../components/modals/BuyNowChoiceModal';
import { CODChoiceModal }        from '../../components/modals/CODChoiceModal';
import { PayOnDeliveryModal }    from '../../components/modals/PayOnDeliveryModal';
import { AntiTarnishBannerGrid }  from '../../components/AntiTarnishBannerGrid';
import { Product }               from '../../lib/api';
import {
  PRODUCTS_CATALOG,
  BRACELET_PRODUCTS,
  NECKLACE_PRODUCTS,
  ANKLET_PRODUCTS,
  PENDANT_PRODUCTS,
  OXIDIZED_EARRINGS_PRODUCTS,
  AMERICAN_DIAMONDS_PRODUCTS,
  MODERN_PENDANTS_PRODUCTS,
  MODERN_EARRINGS_PRODUCTS,
} from '../../lib/productsCatalog';

const ALL_CATALOG_PRODUCTS: Product[] = Object.values(PRODUCTS_CATALOG).map(p => ({
  ...p,
  is_featured: true,
}));

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam   = searchParams ? searchParams.get('category')   : null;
  const subcategoryParam = searchParams ? searchParams.get('subcategory') : null;

  const [selectedCategory,    setSelectedCategory]    = useState<string>('925 Pure Silver');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  // ── View mode — HORIZONTAL is the default on every load (no persistence) ──
  const [viewMode, setViewMode] = useState<ViewMode>('horizontal');
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);

  // Buy Now choice modal states
  const [buyNowChoiceProduct, setBuyNowChoiceProduct] = useState<Product | null>(null);
  const [isBuyNowChoiceOpen, setIsBuyNowChoiceOpen] = useState(false);
  const [isCODModalOpen, setIsCODModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);

  const handleBuyNow = (product: Product) => {
    setBuyNowChoiceProduct(product);
    setIsBuyNowChoiceOpen(true);
  };

  const mainCategories = ['All', '925 Pure Silver', 'Anti Tarnish', 'Best Sellers', 'Hot Deals'];
  const silverSubsections = ['All', 'Bracelets', 'Necklaces', 'Anklets', 'Pendants'];
  const antiTarnishSubsections = ['All', 'Oxidized Earrings', 'American Diamonds', 'Modern Pendants', 'Modern Earrings'];

  useEffect(() => {
    if (!categoryParam) return;
    const catLower = categoryParam.toLowerCase();
    if (catLower === 'silver' || catLower.includes('silver')) {
      setSelectedCategory('925 Pure Silver');
    } else if (catLower === 'antitarnish' || catLower.includes('anti-tarnish') || catLower.includes('antitarnish') || catLower.includes('tarnish')) {
      setSelectedCategory('Anti Tarnish');
    } else if (catLower === 'earrings' || catLower.includes('oxidized')) {
      setSelectedCategory('Anti Tarnish');
      setSelectedSubcategory('Oxidized Earrings');
    } else if (catLower === 'americandiamonds' || catLower.includes('american') || catLower.includes('diamond')) {
      setSelectedCategory('Anti Tarnish');
      setSelectedSubcategory('American Diamonds');
    } else if (catLower === 'bestsellers') {
      setSelectedCategory('Best Sellers');
    } else if (catLower === 'hotdeals') {
      setSelectedCategory('Hot Deals');
    } else if (catLower === 'bracelets') {
      setSelectedCategory('925 Pure Silver');
      setSelectedSubcategory('Bracelets');
    } else if (catLower === 'necklaces' || catLower === 'necklace') {
      setSelectedCategory('925 Pure Silver');
      setSelectedSubcategory('Necklaces');
    } else if (catLower === 'anklets' || catLower === 'anklet') {
      setSelectedCategory('925 Pure Silver');
      setSelectedSubcategory('Anklets');
    } else if (catLower === 'pendants') {
      setSelectedCategory('925 Pure Silver');
      setSelectedSubcategory('Pendants');
    } else if (catLower.includes('modernpendant') || catLower.includes('modern-pendant') || catLower.includes('modern pendants')) {
      setSelectedCategory('Anti Tarnish');
      setSelectedSubcategory('Modern Pendants');
    } else if (catLower.includes('modernearring') || catLower.includes('modern-earring') || catLower.includes('modern earrings') || catLower.includes('modern earring') || catLower.includes('modern earing')) {
      setSelectedCategory('Anti Tarnish');
      setSelectedSubcategory('Modern Earrings');
    } else {
      const match = mainCategories.find(c => c.toLowerCase() === catLower);
      if (match) setSelectedCategory(match);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (!subcategoryParam) return;
    const subLower = subcategoryParam.toLowerCase();
    const matchSilver = silverSubsections.find(s => s.toLowerCase() === subLower);
    if (matchSilver) {
      setSelectedSubcategory(matchSilver);
      setSelectedCategory('925 Pure Silver');
      return;
    }
    const matchAnti = antiTarnishSubsections.find(s => {
      const sLow = s.toLowerCase();
      if (sLow === subLower) return true;
      if (s === 'American Diamonds' && subLower.includes('diamond')) return true;
      if (s === 'Oxidized Earrings' && subLower.includes('oxidized')) return true;
      if (s === 'Modern Pendants' && (subLower.includes('pendant') || subLower === 'modern pendants')) return true;
      if (s === 'Modern Earrings' && (subLower.includes('modern') && (subLower.includes('earring') || subLower.includes('earing')) || subLower === 'modern earrings' || subLower === 'modern earings')) return true;
      return false;
    });
    if (matchAnti) {
      setSelectedSubcategory(matchAnti);
      setSelectedCategory('Anti Tarnish');
      return;
    }
  }, [subcategoryParam]);

  // Strict Category Buckets under 925 Pure Silver
  const bracelets: Product[] = BRACELET_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const necklaces: Product[] = NECKLACE_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const anklets: Product[]   = ANKLET_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const pendants: Product[]  = PENDANT_PRODUCTS.map(p => ({ ...p, is_featured: true }));

  // Strict Category Buckets under Anti Tarnish
  const oxidizedEarrings: Product[] = (OXIDIZED_EARRINGS_PRODUCTS || []).map(p => ({ ...p, is_featured: true }));
  const americanDiamonds: Product[] = (AMERICAN_DIAMONDS_PRODUCTS || []).map(p => ({ ...p, is_featured: true }));
  const modernPendants: Product[] = (MODERN_PENDANTS_PRODUCTS || []).map(p => ({ ...p, is_featured: true }));
  const modernEarrings: Product[] = (MODERN_EARRINGS_PRODUCTS || []).map(p => ({ ...p, is_featured: true }));

  // Filtered list when a single subcategory or other category is selected
  const filteredProducts = ALL_CATALOG_PRODUCTS.filter((product) => {
    if (selectedCategory === '925 Pure Silver') {
      const isSilver =
        product.category === '925 Pure Silver' || product.fabric?.includes('Silver');
      if (!isSilver) return false;
      if (selectedSubcategory !== 'All') {
        return product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
      }
      return true;
    }
    if (selectedCategory === 'Anti Tarnish') {
      const isAntiTarnish = product.category === 'Anti Tarnish';
      if (!isAntiTarnish) return false;
      if (selectedSubcategory !== 'All') {
        return product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
      }
      return true;
    }
    if (selectedCategory === 'Best Sellers')
      return product.price >= 1500 || product.slug.includes('toggle') || product.slug.includes('clover');
    if (selectedCategory === 'Hot Deals')
      return product.price < 1500 || Boolean(product.combo_price);
    // "All" main category
    if (selectedSubcategory !== 'All')
      return product.subcategory?.toLowerCase() === selectedSubcategory.toLowerCase();
    return true;
  });

  const totalDesignsCount =
    selectedCategory === '925 Pure Silver' && selectedSubcategory === 'All'
      ? bracelets.length + necklaces.length + anklets.length + pendants.length
      : selectedCategory === 'Anti Tarnish' && selectedSubcategory === 'All'
        ? oxidizedEarrings.length + americanDiamonds.length + modernPendants.length + modernEarrings.length
        : filteredProducts.length;

  return (
    <div className="w-full">
      {/* ── Top Edge-to-Edge Hero Banner for Anti-Tarnish (Full Viewport Width like Home Screen Model Banner) ── */}
      {selectedCategory === 'Anti Tarnish' && (
        <div
          onClick={() => {
            if (typeof window !== 'undefined') {
              const el = document.getElementById('anti-tarnish-catalog-view');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="w-full bg-[#5f0c1a] relative flex items-center justify-center cursor-pointer select-none group shadow-md border-b border-[#470813]"
          title="Click to explore Anti-Tarnish Collection"
        >
          <div className="w-full max-w-[1920px] aspect-[1024/341] relative overflow-hidden">
            <Image
              src="/images/anti_tarnish/shop_collection_banner_3x.png"
              unoptimized
              alt="Shop the collection - Arghya Anti-Tarnish Fine Jewelry"
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.006]"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
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
        onRazorpayCOD={(p) => setBuyNowProduct(p)}
        onPayOnDelivery={() => setIsPODModalOpen(true)}
      />
      <PayOnDeliveryModal
        isOpen={isPODModalOpen && buyNowChoiceProduct !== null}
        onClose={() => setIsPODModalOpen(false)}
        product={buyNowChoiceProduct as Product}
        selectedSize="Free Size"
        effectivePrice={buyNowChoiceProduct?.price || 0}
      />

      {/* ── Page Heading ── */}
      <div>
        <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
          Arghya Modifications • Fine Jewelry
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-black dark:text-white mt-1">
          {selectedCategory === '925 Pure Silver' && selectedSubcategory !== 'All'
            ? `925 Pure Silver ${selectedSubcategory}`
            : selectedCategory === '925 Pure Silver'
              ? '925 Pure Silver Collection'
              : selectedCategory === 'Anti Tarnish' && selectedSubcategory !== 'All'
                ? `Anti Tarnish ${selectedSubcategory}`
                : selectedCategory === 'Anti Tarnish'
                  ? 'Anti Tarnish Collection'
                  : `${selectedCategory} Collection`}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
          {selectedCategory === 'Anti Tarnish'
            ? 'Intricately handcrafted anti-tarnish jewelry featuring sparkling American Diamond necklace sets and classic oxidized earrings designed for lasting durability and timeless glamour.'
            : 'Handcrafted in genuine 925 sterling silver with waterproof anti-tarnish rhodium finish. Designed for timeless elegance and effortless everyday styling.'}
        </p>
      </div>

      {/* ── Anti-Tarnish Festive Banner & Interactive Category Grid ── */}
      {selectedCategory === 'Anti Tarnish' && (
        <AntiTarnishBannerGrid
          onSelectSubcategory={(sub) => {
            setSelectedSubcategory(sub);
          }}
        />
      )}

      {/* ── Main Category Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubcategory('All');
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Sub-sections under "925 Pure Silver" ── */}
      {selectedCategory === '925 Pure Silver' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-500 dark:text-neutral-400">
              Sub-sections under 925 Pure Silver:
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {totalDesignsCount}{' '}
              {totalDesignsCount === 1 ? 'Design' : 'Designs'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {silverSubsections.map((sub, idx) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  selectedSubcategory === sub
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                    : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                }`}
              >
                {idx > 0 ? `${idx}) ${sub}` : sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Sub-sections under "Anti Tarnish" ── */}
      {selectedCategory === 'Anti Tarnish' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-neutral-500 dark:text-neutral-400">
              Sub-sections under Anti Tarnish:
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              {totalDesignsCount}{' '}
              {totalDesignsCount === 1 ? 'Design' : 'Designs'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {antiTarnishSubsections.map((sub, idx) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  selectedSubcategory === sub
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm ring-2 ring-black dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                    : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
                }`}
              >
                {idx > 0 ? `${idx}) ${sub}` : sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          ── Centered Horizontal / Vertical View Toggle ──
          ════════════════════════════════════════════════════ */}
      <ViewToggle viewMode={viewMode} onChange={setViewMode} />

      {/* ── Main Listing Area ── */}
      <div id="anti-tarnish-catalog-view" className="w-full scroll-mt-24">
        {selectedCategory === '925 Pure Silver' && selectedSubcategory === 'All' ? (
          /* ─────────────────────────────────────────────────
             COMBINED "ALL" VIEW UNDER 925 PURE SILVER
             Separated by clean headings just like home screen
             ───────────────────────────────────────────────── */
          <div className="space-y-16">
            {/* 1. Bracelets Collection */}
            <section id="silver-bracelets-section" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver & Anti-Tarnish
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    Bracelets Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Bracelets')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Bracelets ({bracelets.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {bracelets.map((product, idx) => (
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
                  {bracelets.map((product, idx) => (
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
            <section id="silver-necklace-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver & Anti-Tarnish
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    Necklace Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Necklaces')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Necklaces ({necklaces.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {necklaces.map((product, idx) => (
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
                  {necklaces.map((product, idx) => (
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
            <section id="silver-anklet-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Pure Silver & Anti-Tarnish
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    925 Silver Anklets Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Anklets')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Anklets ({anklets.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {anklets.map((product, idx) => (
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
                  {anklets.map((product, idx) => (
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
            {pendants.length > 0 && (
              <section id="silver-pendant-section" className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                      Pure Silver & Anti-Tarnish
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                      Pendants Collection
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedSubcategory('Pendants')}
                    className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                  >
                    View All Pendants ({pendants.length}) →
                  </button>
                </div>

                {viewMode === 'horizontal' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {pendants.map((product, idx) => (
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
                    {pendants.map((product, idx) => (
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
        ) : selectedCategory === 'Anti Tarnish' && selectedSubcategory === 'All' ? (
          /* ─────────────────────────────────────────────────
             COMBINED "ALL" VIEW UNDER ANTI TARNISH
             ───────────────────────────────────────────────── */
          <div className="space-y-16">
            {/* 1. American Diamonds Collection */}
            <section id="anti-tarnish-american-diamonds-section" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Sparkling AD Sets
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    American Diamonds Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('American Diamonds')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All American Diamonds ({americanDiamonds.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {americanDiamonds.map((product, idx) => (
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
                  {americanDiamonds.map((product, idx) => (
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

            {/* 2. Oxidized Earrings Collection */}
            <section id="anti-tarnish-oxidized-earrings-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Handcrafted Finish
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    Oxidized Earrings Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Oxidized Earrings')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Oxidized Earrings ({oxidizedEarrings.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {oxidizedEarrings.map((product, idx) => (
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
                  {oxidizedEarrings.map((product, idx) => (
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

            {/* 3. Modern Pendants Collection */}
            <section id="anti-tarnish-modern-pendants-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Modern Style
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    Modern Pendants Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Modern Pendants')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Modern Pendants ({modernPendants.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {modernPendants.map((product, idx) => (
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
                  {modernPendants.map((product, idx) => (
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

            {/* 4. Modern Earrings Collection */}
            <section id="anti-tarnish-modern-earrings-section" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono font-bold">
                    Anti Tarnish • Chic & Contemporary
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-black dark:text-white mt-0.5">
                    Modern Earrings Collection
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedSubcategory('Modern Earrings')}
                  className="text-black dark:text-white hover:underline text-xs uppercase tracking-widest font-bold mt-2 sm:mt-0"
                >
                  View All Modern Earrings ({modernEarrings.length}) →
                </button>
              </div>

              {viewMode === 'horizontal' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {modernEarrings.map((product, idx) => (
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
                  {modernEarrings.map((product, idx) => (
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
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-3xl p-8">
            <p className="text-base font-medium text-neutral-600 dark:text-neutral-400">
              New designs for this section are being cataloged. Check back shortly!
            </p>
          </div>
        ) : viewMode === 'horizontal' ? (
          /* ─────────────────────────────────────────────────
             SINGLE SUBCATEGORY / FILTER — Horizontal Grid
             Strictly isolated — no mix-match!
             ───────────────────────────────────────────────── */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product, idx) => (
              <HorizontalProductCard
                key={product.id}
                product={product}
                index={idx}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        ) : (
          /* ─────────────────────────────────────────────────
             SINGLE SUBCATEGORY / FILTER — Vertical List
             ───────────────────────────────────────────────── */
          <div className="flex flex-col w-full">
            {filteredProducts.map((product, idx) => (
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
      </div>
    </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          Loading collection...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
