'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Product } from '../lib/api';
import { LimitedStockModal } from './modals/LimitedStockModal';
import { useTheme } from '../context/ThemeContext';
import { getScarcityPieces, getScarcityText, ScarcityPieces } from '../lib/scarcity';

interface LimitedStockStickerProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  className?: string;
  piecesCount?: ScarcityPieces;
}

// Blinking sequence for Dark Mode
const DARK_LIGHT_COLORS = [
  'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]',
  'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]',
  'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]',
  'bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.9)]',
  'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]',
  'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]',
];

// Blinking sequence for Light Mode
const LIGHT_LIGHT_COLORS = [
  'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)]',
  'bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.7)]',
  'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.7)]',
  'bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.7)]',
  'bg-sky-600 shadow-[0_0_8px_rgba(2,132,199,0.7)]',
  'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]',
];

export const LimitedStockSticker: React.FC<LimitedStockStickerProps> = ({
  product,
  onBuyNow,
  onAddToCart,
  className = '',
  piecesCount: externalPiecesCount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [lightIndex, setLightIndex] = useState(0);

  // Compute pieces: 1, 2, or 3 randomly distributed across catalogue
  const pieces = externalPiecesCount ?? getScarcityPieces(product.id || product.slug || product.name);
  const fullText = getScarcityText(pieces, true); // e.g. "ONLY 1 PIECES LEFT"

  // Detect active theme
  let currentTheme: 'light' | 'dark' = 'dark';
  try {
    const themeContext = useTheme();
    currentTheme = themeContext.theme;
  } catch {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      currentTheme = 'dark';
    } else if (typeof document !== 'undefined') {
      currentTheme = 'light';
    }
  }

  const isDark = currentTheme === 'dark';
  const lightColors = isDark ? DARK_LIGHT_COLORS : LIGHT_LIGHT_COLORS;

  // Smooth typewriter loop displaying "ONLY X PIECES LEFT"
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText.length < fullText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === fullText.length) {
      // Fully typed: pause for 3.2 seconds
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3200);
    } else if (isDeleting && displayText.length > 0) {
      // Backspacing / clearing
      timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      // Pause before retyping
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, fullText]);

  // Color shifting cycle for animated blinking changing lights
  useEffect(() => {
    const lightInterval = setInterval(() => {
      setLightIndex((prev) => (prev + 1) % lightColors.length);
    }, 450);
    return () => clearInterval(lightInterval);
  }, [lightColors.length]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <LimitedStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        piecesCount={pieces}
        onBuyNow={onBuyNow}
        onAddToCart={onAddToCart}
      />

      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer select-none transition-all duration-300 overflow-hidden shadow-md text-left ${className}`}
        style={
          isDark
            ? {
                background: 'linear-gradient(135deg, #1c0608 0%, #350c12 50%, #170407 100%)',
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                boxShadow: '0 4px 15px -2px rgba(185, 28, 28, 0.35), 0 0 10px rgba(245, 158, 11, 0.15)',
                willChange: 'transform',
              }
            : {
                background: 'linear-gradient(135deg, #fff1f2 0%, #fee2e2 50%, #fef3c7 100%)',
                border: '1.5px solid rgba(225, 29, 72, 0.45)',
                boxShadow: '0 4px 14px -2px rgba(225, 29, 72, 0.2), 0 0 10px rgba(245, 158, 11, 0.15)',
                willChange: 'transform',
              }
        }
        title={`${getScarcityText(pieces)} - Click for live inventory status`}
        aria-label={`${getScarcityText(pieces)} - Click for details`}
      >
        {/* Animated Blinking Changing Fairy Lights Array */}
        <div className="flex items-center space-x-1 shrink-0">
          {[0, 1, 2].map((i) => {
            const activeColor = lightColors[(lightIndex + i) % lightColors.length];
            return (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeColor}`}
                style={{
                  willChange: 'background-color, box-shadow',
                }}
              />
            );
          })}
        </div>

        {/* Flame icon indicator with pulse */}
        <Flame className={`w-3.5 h-3.5 shrink-0 animate-pulse ${
          isDark ? 'text-amber-400 fill-amber-400' : 'text-rose-600 fill-rose-600'
        }`} />

        {/* Retyping appearance text container */}
        <div className="flex items-center min-w-[155px] sm:min-w-[170px] h-4 overflow-hidden">
          <span className={`font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider whitespace-nowrap drop-shadow ${
            isDark ? 'text-amber-200' : 'text-rose-950'
          }`}>
            {displayText}
          </span>
          <span 
            className={`inline-block w-1 h-3 ml-0.5 animate-pulse shrink-0 rounded-sm ${
              isDark ? 'bg-amber-400' : 'bg-rose-600'
            }`} 
            aria-hidden="true" 
          />
        </div>

        {/* Right side mini-lights */}
        <div className="hidden xs:flex items-center space-x-1 shrink-0 ml-0.5">
          {[3, 4].map((i) => {
            const activeColor = lightColors[(lightIndex + i) % lightColors.length];
            return (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activeColor}`}
              />
            );
          })}
        </div>

        {/* Shimmer light sweep for luxury look */}
        <motion.div
          animate={{ x: ['-150%', '150%'] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', repeatDelay: 1.2 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      </motion.button>
    </>
  );
};
