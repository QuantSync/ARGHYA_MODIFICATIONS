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
  showNativeLabel: boolean;
  alt: string;
}

const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: 'ethnic-card',
    label: 'ETHNIC',
    subcategory: 'American Diamonds',
    imageSrc: '/images/anti_tarnish/banner_ethnic_ad.jpg',
    labelPosition: 'bottom-right',
    showNativeLabel: true,
    alt: 'Ethnic American Diamond Anti-Tarnish Necklace Set',
  },
  {
    id: 'kashmiri-card',
    label: 'KASHMIRI EARRINGS',
    subcategory: 'Oxidized Earrings',
    imageSrc: '/images/anti_tarnish/banner_kashmiri_earrings.jpg',
    labelPosition: 'bottom-left',
    showNativeLabel: true,
    alt: 'Kashmiri Style Drop & Dangle Traditional Earrings',
  },
  {
    id: 'earrings-card',
    label: 'EARRINGS',
    subcategory: 'Modern Earrings',
    imageSrc: '/images/anti_tarnish/banner_earrings.jpg',
    labelPosition: 'bottom-left',
    showNativeLabel: true,
    alt: 'Anti-Tarnish Butterfly and Modern Earrings',
  },
  {
    id: 'oxidized-card',
    label: 'OXIDIZED',
    subcategory: 'Oxidized Earrings',
    imageSrc: '/images/anti_tarnish/banner_oxidized.jpg',
    labelPosition: 'top-right',
    showNativeLabel: true,
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
    <div className="w-full max-w-5xl mx-auto my-6 sm:my-8 space-y-4 sm:space-y-6 select-none">
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
        title="Shop now - Anti-Tarnish Collection"
      >
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#470813] bg-[#5f0c1a] aspect-[1024/341] transition-transform duration-300 group-hover:scale-[1.01]">
          <Image
            src="/images/anti_tarnish/shop_collection_banner_3x.png"
            alt="Shop the collection - Arghya Anti-Tarnish Fine Jewelry"
            fill
            priority
            quality={100}
            unoptimized
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 1200px"
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

      {/* ── 3. 2x2 Grid of Category Card Buttons with aspect-[2.05/1] for zoomed-out jewelry ── */}
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
              className="group relative w-full h-[160px] sm:h-[210px] md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all cursor-pointer text-left bg-neutral-100 dark:bg-neutral-900"
            >
              {/* Background Image with subtle zoom that preserves jewelry visibility */}
              <Image
                src={card.imageSrc}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* Gradient Scrim for Contrast & Elegance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

              {/* Native Typography Label positioned like in reference image */}
              {card.showNativeLabel && (
                <div className={`absolute z-10 ${positionClasses}`}>
                  <span className="inline-block font-sans font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] group-hover:text-amber-200 transition-colors duration-200">
                    {card.label}
                  </span>
                </div>
              )}

              {/* Active / Hover Ring Highlight */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default AntiTarnishBannerGrid;
