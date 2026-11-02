'use client';

import React from 'react';

interface CardShiningBorderProps {
  children: React.ReactNode;
  /** Tailwind rounded class shared between wrapper and inner slot — must match your card */
  roundedClassName?: string;
  /** Extra classes on the outer wrapper */
  className?: string;
}

/**
 * CardShiningBorder
 * ─────────────────
 * Wraps a card with a continuously-rotating conic-gradient border.
 *
 * Light mode → smooth silver   loop  (slate / white / silver palette)
 * Dark  mode → smooth golden   loop  (amber / gold / cream palette)
 *
 * Speed: ~2.8 s per revolution — not too slow, not too fast.
 *
 * Implementation notes:
 *  • Uses the @property --card-border-angle custom property (registered in globals.css)
 *    so CSS can smoothly animate the conic-gradient start angle.
 *  • Outer wrapper is `p-[2px]` — the 2 px of padding IS the border; no ::before tricks.
 *  • overflow-hidden on both wrapper and inner slot prevents any pixel bleed.
 *  • z-index is NOT touched — the component is fully in-flow.
 */
export const CardShiningBorder: React.FC<CardShiningBorderProps> = ({
  children,
  roundedClassName = 'rounded-2xl',
  className = '',
}) => {
  return (
    <div
      className={[
        'relative p-[2px] overflow-hidden',
        roundedClassName,
        /* Light: silver spinning gradient */
        'bg-[conic-gradient(from_var(--card-border-angle,0deg),#cbd5e1,#f8fafc,#e2e8f0,#94a3b8,#f1f5f9,#cbd5e1)]',
        /* Dark: golden spinning gradient — overridden by dark selector in CSS */
        'dark:bg-[conic-gradient(from_var(--card-border-angle,0deg),#78350f,#D4AF37,#FDE68A,#B8860B,#D4AF37,#78350f)]',
        /* Animation — class defined in globals.css keyframes */
        'animate-cardBorderSpin',
        className,
      ].join(' ')}
      aria-hidden="true"
      style={{ isolation: 'isolate' }}
    >
      {/* Inner content slot — fills the 2px inset and clips the child */}
      <div className={['relative overflow-hidden h-full', roundedClassName].join(' ')}>
        {children}
      </div>
    </div>
  );
};
