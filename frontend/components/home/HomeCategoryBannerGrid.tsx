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
  objectPosition?: string;
}

const ANTI_TARNISH_CARDS: BannerCard[] = [
  {
    id: 'anti-ethnic',
    title: 'ETHNIC',
    href: '/products?category=AntiTarnish&subcategory=AmericanDiamonds',
    imageSrc: '/images/anti_tarnish/banner_ethnic_ad.png',
    labelPosition: 'bottom-right',
    showNativeLabel: false, // Text "ETHNIC" is already embedded high-res in the image
    alt: 'Ethnic American Diamond Anti-Tarnish Jewelry Set',
  },
  {
    id: 'anti-kashmiri',
    title: 'KASHMIRI EARRINGS',
    href: '/products?category=AntiTarnish&subcategory=OxidizedEarrings',
    imageSrc: '/images/anti_tarnish/banner_kashmiri_earrings.png',
    labelPosition: 'bottom-left',
    showNativeLabel: false, // Text "KASHMIRI EARRINGS" is already embedded high-res in the image
    objectPosition: 'object-bottom',
    alt: 'Kashmiri Style Drop & Dangle Traditional Earrings',
  },
  {
    id: 'anti-earrings',
    title: 'EARRINGS',
    href: '/products?category=AntiTarnish&subcategory=ModernEarrings',
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

        {/* 2x2 Grid with exact 2:1 aspect ratio matching 1024x512 images */}
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
                className="group relative block w-full aspect-[2/1] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer bg-neutral-100 dark:bg-neutral-900"
              >
                {/* Background Image - Object-cover with exact 2.05:1 aspect ratio ensures 100% visible products without vertical crop */}
                <Image
                  src={card.imageSrc}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 600px"
                  className={`object-cover ${card.objectPosition || 'object-center'} transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
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

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: BUY 2 AT ₹ 499 + FREE SURPRISE GIFTS
          ═══════════════════════════════════════════════════════ */}
      <div className="pt-2 sm:pt-4">
        <Link
          href="/products?category=HotDeals"
          className="group block relative w-full aspect-[1024/199] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#470813] bg-[#380e0f] cursor-pointer"
          title="Buy 2 at ₹499 + Free Surprise Gifts"
        >
          <Image
            src="/images/home/buy2_at_499_banner.png"
            alt="Buy 2 at ₹499 + Free Surprise Gifts"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.012]"
            priority
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-white/40 transition-colors pointer-events-none" />
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: HOT DEALS - UPTO 70% OFF (Image 2 & Image 3)
          ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3.5 sm:space-y-5 pt-2 sm:pt-4">
        <div className="text-center">
          <Link
            href="/products?category=HotDeals"
            className="inline-flex items-center justify-center gap-3 group"
          >
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
            <h2 className="font-sans text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] uppercase text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
              HOT DEALS - UPTO 70% OFF
            </h2>
            <div className="h-px bg-neutral-300 dark:bg-neutral-700 w-8 sm:w-16 transition-all group-hover:w-12 sm:group-hover:w-20" />
          </Link>
        </div>

        {/* 2-Column Grid for Image 2 (Gift for Her / Mystery Jar) and Image 3 (Combo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5">
          {/* Card 1: Gift for Her (Mystery Jar) -> Takes user to individual product catalogue /products/mystery-jar */}
          <Link
            href="/products/mystery-jar"
            className="group block relative w-full aspect-[1024/662] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer bg-neutral-100 dark:bg-neutral-900"
            title="Explore Mystery Jar - Gift For Her"
          >
            <Image
              src="/images/home/deal_gift_for_her.jpg"
              alt="Gift for Her - Mystery Jar Starts from ₹499"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.018]"
            />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-black/30 dark:group-hover:border-white/40 transition-colors pointer-events-none" />
          </Link>

          {/* Card 2: Combo Earrings + Pendants -> Takes user to Hot Deals / Combo section */}
          <Link
            href="/products?category=HotDeals"
            className="group block relative w-full aspect-[1024/664] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer bg-neutral-100 dark:bg-neutral-900"
            title="Explore Combo - Earrings + Pendants"
          >
            <Image
              src="/images/home/deal_combo_earrings_pendants.jpg"
              alt="Combo Earrings + Pendants Starts from ₹199"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.018]"
            />
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-black/30 dark:group-hover:border-white/40 transition-colors pointer-events-none" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: QUALITY ASSURANCE STRIP (Image 1)
          ═══════════════════════════════════════════════════════ */}
      <div className="pt-2 sm:pt-4">
        <Link
          href="/policy"
          className="group block relative w-full aspect-[1024/188] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#3b0d14] bg-[#290a0e] cursor-pointer"
          title="ARGHYA Quality Assurance & Certified Policies"
        >
          <Image
            src="/images/home/quality_assurance_banner.png"
            alt="925 Silver Purity Certificate, Free Shipping Across India, High Quality Material, 7 Days Exchange & Return"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.008]"
          />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors pointer-events-none" />
        </Link>
      </div>
    </div>
  );
};

export default HomeCategoryBannerGrid;
