'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, Sparkles, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { PRODUCTS_CATALOG, CatalogProduct } from '../../lib/productsCatalog';

interface DiscountedProduct extends CatalogProduct {
  discountPercent: number;
}

export const MaxDiscountProductsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  // Compute products with highest discount sorted in descending order
  const discountedProducts = useMemo(() => {
    const list: DiscountedProduct[] = [];

    Object.values(PRODUCTS_CATALOG).forEach((product) => {
      if (product.compare_at_price && product.compare_at_price > product.price) {
        const discountPercent = Math.round(
          ((product.compare_at_price - product.price) / product.compare_at_price) * 100
        );
        if (discountPercent > 0) {
          list.push({
            ...product,
            discountPercent,
          });
        }
      }
    });

    // Sort strictly descending by discount percentage
    return list.sort((a, b) => b.discountPercent - a.discountPercent);
  }, []);

  // Filter based on active category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') {
      return discountedProducts.slice(0, 8); // Top 8 highest discounts
    }
    return discountedProducts
      .filter((p) => {
        if (activeCategory === '925 Pure Silver') {
          return p.category === '925 Pure Silver';
        }
        if (activeCategory === 'Anti Tarnish') {
          return p.category === 'Anti Tarnish';
        }
        if (activeCategory === 'Hot Deals') {
          return p.category === 'Hot Deals';
        }
        return true;
      })
      .slice(0, 8);
  }, [discountedProducts, activeCategory]);

  return (
    <section className="w-full py-10 sm:py-14 select-none">
      {/* ── Catalogue Name on Top ── */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-widest mb-3 border border-red-200 dark:border-red-900/50">
          <Zap size={14} className="fill-current animate-pulse" />
          <span>Mega Savings Spotlight</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase mb-3">
          MAXIMUM DISCOUNTS — UP TO 72% OFF
        </h2>
        <div className="w-16 h-0.5 bg-black dark:bg-white mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-sans tracking-wide">
          Handcrafted statement jewellery and everyday luxury at maximum price drops.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'ALL', label: 'ALL DEALS' },
            { id: '925 Pure Silver', label: '925 PURE SILVER' },
            { id: 'Anti Tarnish', label: 'ANTI - TARNISH' },
            { id: 'Hot Deals', label: 'HOT DEALS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                activeCategory === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-105'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Grid: 2 Cols Mobile, 3 Cols Tablet, 4 Cols Desktop ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => {
            const primaryImage = product.images?.[0] || '/images/placeholder.png';
            const hoverImage = product.images?.[1] || primaryImage;

            return (
              <div
                key={product.id || product.slug}
                className="group relative flex flex-col bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container with Badge */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-full aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 block"
                >
                  {/* Primary Image */}
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Hover Image */}
                  <Image
                    src={hoverImage}
                    alt={`${product.name} detail view`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  />

                  {/* Top-Right Discount Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider bg-red-600 text-white shadow-md">
                      -{product.discountPercent}% OFF
                    </span>
                  </div>

                  {/* Top-Left Category Pill */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-xs text-white">
                      {product.category === '925 Pure Silver'
                        ? '925 Silver'
                        : product.category === 'Anti Tarnish'
                        ? 'Anti-Tarnish'
                        : 'Hot Deal'}
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Subcategory / Type */}
                    <p className="text-[10px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400 font-medium mb-1 truncate">
                      {product.subcategory || product.category}
                    </p>

                    {/* Name */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="block font-serif text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white line-clamp-2 hover:underline decoration-neutral-400 group-hover:text-black dark:group-hover:text-white"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                    <div className="flex items-baseline gap-2 mb-2.5">
                      <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-xs text-neutral-600 dark:text-neutral-400 line-through">
                          ₹{product.compare_at_price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Direct Buy Now / Razorpay or Product Page */}
                    {product.razorpay_url ? (
                      <a
                        href={product.razorpay_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow"
                      >
                        <ShoppingBag size={13} />
                        <span>Buy Now</span>
                      </a>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-neutral-100 dark:hover:bg-white dark:text-black text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                      >
                        <span>View Deal</span>
                        <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Deals button */}
        <div className="text-center mt-10">
          <Link
            href="/products?category=HotDeals"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-black dark:border-white text-black dark:text-white font-serif text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-semibold shadow-sm hover:shadow-lg"
          >
            <span>Explore All Hot Deals & Catalogues</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MaxDiscountProductsSection;

