'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BannerCard {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  labelPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'bottom-center';
  showNativeLabel: boolean;
  alt: string;
}

const ANTI_TARNISH_CARDS: BannerCard[] = [
  {
    id: 'anti-ethnic',
    title: 'ETHNIC',
    href: '/products?category=AntiTarnish&subcategory=AmericanDiamonds',
    imageSrc: '/images/anti_tarnish/banner_ethnic_ad.jpg',
    labelPosition: 'bottom-right',
    showNativeLabel: true,
    alt: 'Ethnic American Diamond Anti-Tarnish Jewelry Set',
  },
  {
    id: 'anti-kashmiri',
    title: 'KASHMIRI EARRINGS',
    href: '/products?category=AntiTarnish&subcategory=OxidizedEarrings',
    imageSrc: '/images/anti_tarnish/banner_kashmiri_earrings.jpg',
    labelPosition: 'bottom-left',
    showNativeLabel: true,
    alt: 'Kashmiri Style Drop & Dangle Traditional Earrings',
  },
  {
    id: 'anti-earrings',
    title: 'EARRINGS',
    href: '/products?category=AntiTarnish&subcategory=OxidizedEarrings',
    imageSrc: '/images/anti_tarnish/banner_earrings.jpg',
    labelPosition: 'bottom-left',
    showNativeLabel: true,
    alt: 'Anti-Tarnish Butterfly and Modern Earrings',
  },
  {
    id: 'anti-oxidized',
    title: 'OXIDIZED',
    href: '/products?category=AntiTarnish&subcategory=OxidizedEarrings',
    imageSrc: '/images/anti_tarnish/banner_oxidized.jpg',
    labelPosition: 'top-right',
    showNativeLabel: true,
    alt: 'Handcrafted Oxidized Silver Traditional Earrings',
  },
];

const PURE_SILVER_CARDS: BannerCard[] = [
  {
    id: 'silver-bracelets',
    title: 'BRACELETS',
    href: '/products?category=Silver&subcategory=Bracelets',
    imageSrc: '/images/home_banner/silver_bracelets.jpg',
    labelPosition: 'bottom-center',
    showNativeLabel: false, // already rendered high-res on image
    alt: '925 Pure Silver Handcrafted Bracelets',
  },
  {
    id: 'silver-necklace',
    title: 'NECKLACE',
    href: '/products?category=Silver&subcategory=Necklaces',
    imageSrc: '/images/home_banner/silver_necklace.jpg',
    labelPosition: 'bottom-center',
    showNativeLabel: false, // already rendered high-res on image
    alt: '925 Pure Silver Minimalist & Statement Necklaces',
  },
  {
    id: 'silver-anklets',
    title: 'ANKLETS',
    href: '/products?category=Silver&subcategory=Anklets',
    imageSrc: '/images/home_banner/silver_anklets.jpg',
    labelPosition: 'bottom-center',
    showNativeLabel: false, // already rendered high-res on image
    alt: '925 Pure Silver Traditional & Modern Anklets',
  },
];

export const HomeCategoryBannerGrid: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 sm:space-y-12 select-none">
      {/* ═══════════════════════════════════════════════════════
          SECTION 1: ANTI - TARNISH (2x2 Grid from Image 1)
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3.5 sm:space-y-5">
        {/* Native Section Heading */}
        <div className="text-center">
          <Link
            href="/products?category=AntiTarnish"
            className="inline-flex items-center justify-center gap-3 group"
          >
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
            <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-[0.3em] uppercase text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              Anti - Tarnish
            </h2>
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
          </Link>
        </div>

        {/* 2x2 Grid with aspect-[2.05/1] for zoomed-out fully visible jewelry */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
          {ANTI_TARNISH_CARDS.map((card) => {
            const positionClasses = {
              'bottom-right': 'bottom-2.5 right-3 sm:bottom-3.5 sm:right-4 text-right',
              'bottom-left': 'bottom-2.5 left-3 sm:bottom-3.5 sm:left-4 text-left',
              'top-right': 'top-2.5 right-3 sm:top-3.5 sm:right-4 text-right',
              'bottom-center': 'bottom-2.5 inset-x-0 text-center',
            }[card.labelPosition || 'bottom-left'];

            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative block w-full h-[160px] sm:h-[210px] md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer bg-neutral-100 dark:bg-neutral-900"
              >
                {/* Background Image - Object-cover with exact 2.05:1 aspect ratio ensures 100% visible products without vertical crop */}
                <Image
                  src={card.imageSrc}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Native Text Label (when image does not have text baked in) */}
                {card.showNativeLabel && (
                  <div className={`absolute z-10 ${positionClasses}`}>
                    <span className="inline-block font-sans font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] group-hover:text-amber-200 transition-colors duration-200">
                      {card.title}
                    </span>
                  </div>
                )}

                {/* Hover Border Ring */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: 925 PURE SILVER (3 Cards from Image 1, 2, 3, 4)
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3.5 sm:space-y-5">
        {/* Native Section Heading */}
        <div className="text-center">
          <Link
            href="/products?category=Silver"
            className="inline-flex items-center justify-center gap-3 group"
          >
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
            <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-[0.3em] uppercase text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              925 Pure Silver
            </h2>
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
          </Link>
        </div>

        {/* 3-Column Grid for Bracelets, Necklace, Anklets with aspect-[3/4] */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-5">
          {PURE_SILVER_CARDS.map((card) => {
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative block w-full aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer bg-neutral-100 dark:bg-neutral-900"
              >
                {/* Background Image (High-Res Image 2, 3, 4) */}
                <Image
                  src={card.imageSrc}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 400px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

                {/* Hover Border Ring */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryBannerGrid;
