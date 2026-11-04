'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AntiTarnishBannerGridProps {
  onSelectSubcategory: (subcategory: string) => void;
}

interface CategoryCardItem {
  id: string;
  label: string;
  subcategory: string;
  imageSrc: string;
  labelPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  alt: string;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'ethnic-card',
    label: 'ETHNIC',
    subcategory: 'American Diamonds',
    imageSrc: '/images/anti_tarnish/banner_ethnic_ad.jpg',
    labelPosition: 'bottom-right',
    alt: 'Ethnic American Diamond Anti-Tarnish Necklace Set',
  },
  {
    id: 'kashmiri-card',
    label: 'KASHMIRI EARRINGS',
    subcategory: 'Oxidized Earrings',
    imageSrc: '/images/anti_tarnish/banner_kashmiri_earrings_clean.jpg',
    labelPosition: 'bottom-left',
    alt: 'Kashmiri Style Drop & Dangle Earrings',
  },
  {
    id: 'earrings-card',
    label: 'EARRINGS',
    subcategory: 'Oxidized Earrings',
    imageSrc: '/images/anti_tarnish/banner_earrings.jpg',
    labelPosition: 'bottom-left',
    alt: 'Anti-Tarnish Modern Earrings',
  },
  {
    id: 'oxidized-card',
    label: 'OXIDIZED',
    subcategory: 'Oxidized Earrings',
    imageSrc: '/images/anti_tarnish/banner_oxidized.jpg',
    labelPosition: 'top-right',
    alt: 'Handcrafted Traditional Oxidized Silver Earrings',
  },
];

export const AntiTarnishBannerGrid: React.FC<AntiTarnishBannerGridProps> = ({
  onSelectSubcategory,
}) => {
  const handleClick = (subcategory: string) => {
    onSelectSubcategory(subcategory);

    // Smooth scroll down to the product catalog listing
    if (typeof window !== 'undefined') {
      const target = document.getElementById('anti-tarnish-catalog-view');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 sm:my-8 space-y-4 sm:space-y-6">
      {/* ── 1. Top Promo Banner (Get Free Gifts on Order Above INR 299) ── */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            const target = document.getElementById('anti-tarnish-catalog-view');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        className="w-full text-left focus:outline-none group block cursor-pointer"
        title="Shop now for Free Gifts on Orders above INR 299"
      >
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-pink-200/80 dark:border-neutral-800 bg-[#fce7f3] aspect-[1024/283] transition-transform duration-300 group-hover:scale-[1.01]">
          <Image
            src="/images/anti_tarnish/free_gifts_banner.jpg"
            alt="Get Free Gifts On Order Above INR 299 - Shop Now"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>
      </button>

      {/* ── 2. Native Website Typography Center Divider ── */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 py-1">
        <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-12 sm:w-24" />
        <span className="font-serif text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] font-semibold text-neutral-800 dark:text-neutral-200 select-none">
          Anti – Tarnish Pieces
        </span>
        <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-12 sm:w-24" />
      </div>

      {/* ── 3. 2x2 Grid of Category Card Buttons ── */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
        {CATEGORY_CARDS.map((card) => {
          // Label position styles matching Image 1
          const positionClasses = {
            'bottom-right': 'bottom-2.5 right-3 sm:bottom-3.5 sm:right-4 text-right',
            'bottom-left': 'bottom-2.5 left-3 sm:bottom-3.5 sm:left-4 text-left',
            'top-right': 'top-2.5 right-3 sm:top-3.5 sm:right-4 text-right',
            'top-left': 'top-2.5 left-3 sm:top-3.5 sm:left-4 text-left',
          }[card.labelPosition];

          return (
            <motion.button
              key={card.id}
              type="button"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleClick(card.subcategory)}
              className="group relative w-full h-[140px] sm:h-[200px] md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all cursor-pointer text-left"
            >
              {/* Background Image with Hover Zoom */}
              <Image
                src={card.imageSrc}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim for Contrast & Elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Native Typography Label positioned like in reference image */}
              <div className={`absolute z-10 ${positionClasses}`}>
                <span className="inline-block font-sans font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-amber-200 transition-colors duration-200">
                  {card.label}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-neutral-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5">
                  Explore Collection →
                </span>
              </div>

              {/* Active / Hover Ring Highlight */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AntiTarnishBannerGrid;
