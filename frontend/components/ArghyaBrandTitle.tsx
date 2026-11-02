'use client';

import React from 'react';
import Image from 'next/image';
import { PopFade } from './animations/PopFade';
import { TypingImageReveal } from './animations/TypingImageReveal';

interface ArghyaBrandTitleProps {  //
  className?: string;
  variant?: 'card' | 'transparent';
  priority?: boolean;
}

/**
 * ArghyaBrandTitle Component
 * Renders the exact luxury typographic "ARGHYA" & "SLAY EVERYDAY" brand identity
 * extracted directly from the official brand artwork with zero pixel overflow.
 * Animations:
 * - ARGHYA: PopFade in
 * - SLAY EVERYDAY: Fast typing reveal
 */
export const ArghyaBrandTitle: React.FC<ArghyaBrandTitleProps> = ({
  className = '',
  variant = 'transparent',  //
  priority = true,
}) => {
  // If we just want the static card version without animations
  if (variant === 'card') {
    return (
      <div className={`relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 ${className}`}>
        <h1 className="sr-only">ARGHYA - SLAY EVERYDAY</h1>
        <div className="relative w-full max-w-[700px] aspect-[711/407] overflow-hidden drop-shadow-2xl">
          <Image
            src="/images/arghya_logo_card.png"
            alt="ARGHYA - SLAY EVERYDAY"
            fill
            sizes="(max-width: 768px) 90vw, 700px"
            priority={priority}
            className="object-contain object-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 ${className}`}>
      {/* Screen reader fallback for SEO and accessibility */}
      <h1 className="sr-only">ARGHYA - SLAY EVERYDAY</h1>

      <div className="flex flex-col items-center justify-center w-full max-w-[657px] gap-8 mt-4 mb-4">
        {/* ARGHYA PopFade Animation */}
        <PopFade delay={0.1} duration={0.8} className="relative w-full aspect-[657/142] drop-shadow-2xl">
          <Image
            src="/images/arghya_text_only.png"
            alt="ARGHYA"
            fill
            sizes="(max-width: 768px) 90vw, 657px"
            priority={priority}
            className="object-contain object-center"
          />
        </PopFade>

        {/* SLAY EVERYDAY Typing Reveal Animation */}
        <TypingImageReveal delay={0.6} duration={0.7} className="relative w-full max-w-[320px] aspect-[320/21]">
          <Image
            src="/images/slay_text_only.png"
            alt="SLAY EVERYDAY"
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            priority={priority}
            className="object-contain object-center"
          />
        </TypingImageReveal>
      </div>
    </div>
  );
};

export default ArghyaBrandTitle;
