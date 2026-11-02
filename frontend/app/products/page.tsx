'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VerticalProductCard }   from '../../components/VerticalProductCard';
import { HorizontalProductCard } from '../../components/HorizontalProductCard';
import { ViewToggle, ViewMode }  from '../../components/ViewToggle';
import { CartDrawer }            from '../../components/CartDrawer';
import { PaymentRedirectCard }   from '../../components/PaymentRedirectCard';
import { Product }               from '../../lib/api';
import {
  PRODUCTS_CATALOG,
  BRACELET_PRODUCTS,
  NECKLACE_PRODUCTS,
  ANKLET_PRODUCTS,
  PENDANT_PRODUCTS,
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

  const mainCategories = ['All', '925 Pure Silver', 'Anti Tarnish', 'Best Sellers', 'Hot Deals'];
  const silverSubsections = ['All', 'Bracelets', 'Necklaces', 'Anklets', 'Pendants'];

  useEffect(() => {
    if (!categoryParam) return;
    const catLower = categoryParam.toLowerCase();
    if (catLower === 'silver' || catLower.includes('silver')) {
      setSelectedCategory('925 Pure Silver');
    } else if (catLower === 'antitarnish') {
      setSelectedCategory('Anti Tarnish');
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
    } else {
      const match = mainCategories.find(c => c.toLowerCase() === catLower);
      if (match) setSelectedCategory(match);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (!subcategoryParam) return;
    const subLower = subcategoryParam.toLowerCase();
    const matchSub = silverSubsections.find(s => s.toLowerCase() === subLower);
    if (matchSub) {
      setSelectedSubcategory(matchSub);
      setSelectedCategory('925 Pure Silver');
    }
  }, [subcategoryParam]);

  // Strict Category Buckets under 925 Pure Silver
  const bracelets: Product[] = BRACELET_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const necklaces: Product[] = NECKLACE_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const anklets: Product[]   = ANKLET_PRODUCTS.map(p => ({ ...p, is_featured: true }));
  const pendants: Product[]  = PENDANT_PRODUCTS.map(p => ({ ...p, is_featured: true }));

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
    if (selectedCategory === 'Anti Tarnish')  return true;
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
      : filteredProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <CartDrawer />
      <PaymentRedirectCard
        isOpen={buyNowProduct !== null}
        onClose={() => setBuyNowProduct(null)}
        product={buyNowProduct}
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
              : `${selectedCategory} Collection`}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
          Handcrafted in genuine 925 sterling silver with waterproof anti-tarnish rhodium
          finish. Designed for timeless elegance and effortless everyday styling.
        </p>
      </div>

      {/* ── Main Category Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              if (cat !== '925 Pure Silver') setSelectedSubcategory('All');
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

      {/* ════════════════════════════════════════════════════
          ── Centered Horizontal / Vertical View Toggle ──
          ════════════════════════════════════════════════════ */}
      <ViewToggle viewMode={viewMode} onChange={setViewMode} />

      {/* ── Main Listing Area ── */}
      <div className="w-full">
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
                      onBuyNow={setBuyNowProduct}
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
                      onBuyNow={setBuyNowProduct}
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
                      onBuyNow={setBuyNowProduct}
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
                      onBuyNow={setBuyNowProduct}
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
                      onBuyNow={setBuyNowProduct}
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
                      onBuyNow={setBuyNowProduct}
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
                        onBuyNow={setBuyNowProduct}
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
                        onBuyNow={setBuyNowProduct}
                        isCouponActive={false}
                        activeCouponCode={null}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}
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
                onBuyNow={setBuyNowProduct}
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
                onBuyNow={setBuyNowProduct}
                isCouponActive={false}
                activeCouponCode={null}
              />
            ))}
          </div>
        )}
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
