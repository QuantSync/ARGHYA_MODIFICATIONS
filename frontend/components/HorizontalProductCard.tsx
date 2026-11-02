'use client';

/**
 * HorizontalProductCard — Used in the Horizontal (grid) view of the product catalogue.
 * Design inspired by reference: portrait image → name → price → full-width "Buy Now" button.
 *
 * When a razorpay_url is present on the product, "Buy Now" opens the Razorpay payment link
 * in a new tab. Otherwise it navigates to the product detail page.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../lib/api';

interface HorizontalProductCardProps {
  product: Product;
  index: number;
  onBuyNow?: (product: Product) => void;
}

export const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  index,
  onBuyNow,
}) => {
  const hasImage  = Boolean(product.images?.[0]?.trim());
  const mainImage = product.images?.[0] || '';
  const razorUrl  = (product as Product & { razorpay_url?: string }).razorpay_url;

  const discountPct =
    product.compare_at_price && product.price < product.compare_at_price
      ? Math.round((1 - product.price / product.compare_at_price) * 100)
      : 0;

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onBuyNow) {
      onBuyNow(product);
    } else if (razorUrl) {
      window.open(razorUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 group overflow-hidden">
      {/* ── Product Image ── */}
      <Link
        href={`/products/${product.slug}`}
        className="relative w-full overflow-hidden block"
        style={{ aspectRatio: '3/4' }}
        tabIndex={-1}
      >
        {hasImage ? (
          <Image
            src={mainImage}
            alt={`${product.name} - 925 Sterling Silver`}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 4}
          />
        ) : (
          /* Placeholder when no image is uploaded yet */
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950 flex flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="font-serif text-3xl font-light text-neutral-400 dark:text-neutral-600 mb-1">
              925
            </span>
            <span className="text-[11px] uppercase font-black tracking-wider text-neutral-700 dark:text-neutral-300">
              PRODUCT OUT OF STOCK
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              COMING SOON
            </span>
          </div>
        )}

        {/* Discount badge — top-left */}
        {discountPct > 0 && (
          <span className="absolute top-0 left-0 bg-black text-white text-[10px] font-bold px-2.5 py-1.5 uppercase tracking-wider z-10">
            {discountPct}% OFF
          </span>
        )}

        {/* Combo badge — bottom-left */}
        {product.combo_price && (
          <span className="absolute bottom-0 left-0 bg-black text-white text-[10px] font-bold px-2.5 py-1.5 uppercase tracking-wider z-10">
            BUY 2 @ ₹{product.combo_price.toLocaleString('en-IN')}
          </span>
        )}

        {/* 925 Silver badge — top-right */}
        <span className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 text-black dark:text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest z-10 border border-neutral-200 dark:border-neutral-700">
          925 Silver
        </span>
      </Link>

      {/* ── Info Section ── */}
      <div className="flex flex-col gap-2 p-3">
        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-black dark:text-white leading-snug line-clamp-2 hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-black dark:text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.compare_at_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* ── Buy Now button ── */}
        <button
          onClick={handleBuyNow}
          aria-label={`Buy Now — ${product.name}`}
          className="w-full mt-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

