'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BannerSlide {
  src: string;
  srcSet?: string;
  alt: string;
  bgColor: string;
  href?: string;
  onClickScrollId?: string;
  title?: string;
}

interface BannerSlideshowProps {
  slides: BannerSlide[];
  intervalMs?: number;
  className?: string;
  priorityFirst?: boolean;
}

export const BannerSlideshow: React.FC<BannerSlideshowProps> = ({
  slides,
  intervalMs = 3500,
  className = '',
  priorityFirst = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const router = useRouter();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide effect
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused, intervalMs, goToNext]);

  const handleSlideClick = (slide: BannerSlide) => {
    if (slide.onClickScrollId && typeof window !== 'undefined') {
      const el = document.getElementById(slide.onClickScrollId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    if (slide.href) {
      router.push(slide.href);
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!slides || slides.length === 0) return null;

  const currentBg = slides[currentIndex]?.bgColor || '#000000';

  return (
    <div
      className={`relative w-full overflow-hidden select-none transition-colors duration-500 shadow-md ${className}`}
      style={{ backgroundColor: currentBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container (1024x341 is exact 3:1) */}
      <div className="relative w-full aspect-[1024/341] overflow-hidden">
        {/* Horizontal Track sliding right-to-left */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={`${slide.src}-${idx}`}
              onClick={() => handleSlideClick(slide)}
              className="w-full h-full shrink-0 relative cursor-pointer flex items-center justify-center"
              style={{ backgroundColor: slide.bgColor }}
              title={slide.title || slide.alt}
            >
              {/* Native sharp image with full responsive srcset */}
              <img
                src={slide.src}
                srcSet={slide.srcSet}
                sizes="100vw"
                alt={slide.alt}
                width={3072}
                height={1023}
                decoding="async"
                fetchPriority={idx === 0 && priorityFirst ? 'high' : 'auto'}
                className="block w-full h-full object-cover object-center select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows (visible on desktop hover if multiple slides) */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/40 text-white hover:bg-black/70 active:scale-90 transition-all opacity-0 hover:opacity-100 sm:group-hover:opacity-100 focus:opacity-100"
              aria-label="Previous Banner"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/40 text-white hover:bg-black/70 active:scale-90 transition-all opacity-0 hover:opacity-100 sm:group-hover:opacity-100 focus:opacity-100"
              aria-label="Next Banner"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Slide Dots / Indicators */}
        {totalSlides > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full">
            {slides.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white shadow-sm'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerSlideshow;

