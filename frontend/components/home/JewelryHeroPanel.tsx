'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Model3DHeroWidget } from './Model3DHeroWidget';

interface CategoryCardProps {
  label: string;
  href: string;
  variant: 'top-pillar' | 'bottom-pillar';
  imageSrc?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ label, href, variant, imageSrc }) => {
  const imgSrc = imageSrc || '/images/category_circle_clean.png';

  if (variant === 'top-pillar') {
    // ANKLETS and CHAINS: Black pillar from top, circle near bottom, label below in white area
    return (
      <Link href={href} className="group flex flex-col items-center justify-between h-[340px] sm:h-[380px] w-full max-w-[210px] mx-auto cursor-pointer transition-transform duration-300">
        <div className="w-full h-[280px] sm:h-[310px] bg-black relative flex flex-col items-center justify-end pb-3 sm:pb-4 overflow-visible">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 ring-1 ring-white/10 bg-neutral-900">
            <Image
              src={imgSrc}
              alt={label}
              fill
              sizes="(max-width: 768px) 130px, 160px"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="pt-3 pb-1 text-center">
          <span className="font-serif text-[11px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-black font-medium transition-colors group-hover:text-neutral-600">
            {label.split('').join(' ')}
          </span>
        </div>
      </Link>
    );
  }

  // NECKLACE and BRACELETS: Label at top in white area, circle, black pillar extending down
  return (
    <Link href={href} className="group flex flex-col items-center justify-between h-[340px] sm:h-[380px] w-full max-w-[210px] mx-auto cursor-pointer transition-transform duration-300">
      <div className="pb-3 pt-1 text-center">
        <span className="font-serif text-[11px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-black font-medium transition-colors group-hover:text-neutral-600">
          {label.split('').join(' ')}
        </span>
      </div>
      <div className="w-full h-[280px] sm:h-[310px] bg-black relative flex flex-col items-center justify-start pt-3 sm:pt-4 overflow-visible">
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 ring-1 ring-white/10 bg-neutral-900">
          <Image
            src={imgSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 130px, 160px"
            className="object-cover object-center"
          />
        </div>
      </div>
    </Link>
  );
};

interface JewelryHeroPanelProps {
  hideBanner?: boolean;
}

export const JewelryHeroPanel: React.FC<JewelryHeroPanelProps> = ({ hideBanner = false }) => {
  return (
    <section className="w-full bg-white select-none">
      {/* ── 0. Top Announcement Bar ── */}
      <div className="w-full bg-black text-white text-[11px] sm:text-xs py-2 tracking-[0.25em] font-sans font-medium text-center uppercase select-none border-b border-stone-800">
        FREE SHIPPING EVERYWHERE
      </div>

      {/* ── 1. Black Hero Banner (BUY 2 @ 2,299 + Model) — hidden when hideBanner=true ── */}
      {!hideBanner && (
        <div className="w-full bg-black text-white overflow-hidden relative">
          <div className="w-full flex flex-col md:flex-row items-center justify-between min-h-[380px] sm:min-h-[440px] md:min-h-[500px] lg:min-h-[560px] xl:min-h-[600px]">
            {/* Left Text Column */}
            <div className="w-full md:w-5/12 lg:w-5/12 flex flex-col items-center md:items-start justify-center px-6 sm:px-12 md:pl-16 lg:pl-24 xl:pl-32 py-12 md:py-8 z-10 text-center md:text-left shrink-0">
              <span className="font-serif text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase text-stone-300 mb-3 sm:mb-4">
                B U Y
              </span>

              <h1 className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-none text-white mb-6 sm:mb-8 flex items-baseline gap-2 sm:gap-3">
                <span className="font-sans font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem]">2 @</span>
                <span>2,299</span>
              </h1>

              <Link
                href="/products"
                className="inline-block border border-white text-white font-serif text-xs sm:text-sm tracking-[0.25em] uppercase px-8 sm:px-10 py-2.5 sm:py-3 hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
              >
                SHOP NOW
              </Link>
            </div>

            {/* Right Model Photography Column with 3D Pop-Out Zoom Effect - Flush to Rightmost Edge */}
            <div className="w-full md:w-7/12 lg:w-7/12 h-[380px] sm:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px] relative flex items-end justify-end overflow-visible ml-auto">
              <Model3DHeroWidget />
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Alternating Geometric Categories Section ── */}
      <div className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-12 border-b border-stone-200">
        <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Column 1: ANKLETS (Top Black Pillar) */}
          <CategoryCard
            label="ANKLETS"
            href="/products?category=anklets"
            variant="top-pillar"
            imageSrc="/images/anklets/925-traditional-silver-ghungroo-anklet_1.png"
          />

          {/* Column 2: NECKLACE (Bottom Black Pillar) */}
          <CategoryCard
            label="NECKLACE"
            href="/products?category=necklaces"
            variant="bottom-pillar"
          />

          {/* Column 3: CHAINS (Top Black Pillar) */}
          <CategoryCard
            label="CHAINS"
            href="/products?category=chains"
            variant="top-pillar"
          />

          {/* Column 4: BRACELETS (Bottom Black Pillar) */}
          <CategoryCard
            label="BRACELETS"
            href="/products?category=bracelets"
            variant="bottom-pillar"
            imageSrc="/images/clover_bracelet/clover_bracelet_1.png"
          />
        </div>
      </div>
    </section>
  );
};

export default JewelryHeroPanel;

