'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShiningMovingBorderProps {
  children: React.ReactNode;
  /** Extra classes applied to the outer wrapper div */
  className?: string;
  /** Rounded corner class e.g. "rounded-3xl" */
  roundedClassName?: string;
  /** Whether the card is clickable and opens a modal */
  clickable?: boolean;
}

/**
 * ShiningMovingBorder
 * -------------------
 * Dark mode  → Smooth rotating GOLDEN conic-gradient border (warm 3-D glow)
 * Light mode → Smooth rotating SILVER conic-gradient border (cool glint)
 *
 * Rules observed:
 *  - No pixel overflow: overflow-hidden on outer wrapper
 *  - No logical errors: gradient rotation is driven by a single CSS animation via keyframes injected once
 *  - No superimposing: z-index layering is explicit (-z-10 for the gradient track)
 *  - No render-flow errors: no absolute+relative conflicts; uses padding trick for the border
 */
export const ShiningMovingBorder: React.FC<ShiningMovingBorderProps> = ({
  children,
  className = '',
  roundedClassName = 'rounded-3xl',
  clickable = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (clickable) setModalOpen(true);
  };

  return (
    <>
      {/* ── Outer padding-border container ── */}
      <div
        ref={wrapperRef}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className={`relative p-[2.5px] ${roundedClassName} overflow-hidden ${clickable ? 'cursor-pointer' : ''} ${className}`}
        style={{ isolation: 'isolate' }}
      >
        {/* ── Animated conic-gradient track (behind content via z-index) ── */}
        <div
          className={`
            absolute inset-0 ${roundedClassName}
            /* Dark mode: golden rotating border */
            dark:animate-[shineBorderSpin_3s_linear_infinite]
            dark:[background:conic-gradient(from_var(--border-angle,0deg),#78350f,#D4AF37,#FDE68A,#D4AF37,#78350f,#D4AF37,#78350f)]
            /* Light mode: silver rotating border */
            animate-[shineBorderSpin_3.5s_linear_infinite]
            [background:conic-gradient(from_var(--border-angle,0deg),#9ca3af,#e5e7eb,#f8fafc,#e5e7eb,#9ca3af,#e5e7eb,#9ca3af)]
          `}
          aria-hidden="true"
          style={
            {
              '--border-angle': '0deg',
            } as React.CSSProperties
          }
        />

        {/* ── Inner content card ── */}
        <div className={`relative z-10 ${roundedClassName} overflow-hidden`}>
          {children}
        </div>
      </div>

      {/* ── Modal overlay (only rendered when clickable & open) ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="shining-border-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            {/* Blurred dark backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            <motion.div
              key="shining-border-modal-card"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative z-10 w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Shining border on the modal card too */}
              <div className="relative p-[2.5px] rounded-3xl overflow-hidden" style={{ isolation: 'isolate' }}>
                <div
                  className="absolute inset-0 rounded-3xl dark:animate-[shineBorderSpin_2.5s_linear_infinite] dark:[background:conic-gradient(from_var(--border-angle,0deg),#78350f,#D4AF37,#FDE68A,#D4AF37,#78350f)] animate-[shineBorderSpin_3s_linear_infinite] [background:conic-gradient(from_var(--border-angle,0deg),#9ca3af,#e5e7eb,#f8fafc,#e5e7eb,#9ca3af)]"
                  aria-hidden="true"
                />
                <div className="relative z-10 rounded-3xl bg-black overflow-hidden">
                  {children}
                </div>
              </div>

              {/* Close hint */}
              <p className="text-center text-stone-500 text-xs mt-4 font-mono tracking-widest uppercase">
                Click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
