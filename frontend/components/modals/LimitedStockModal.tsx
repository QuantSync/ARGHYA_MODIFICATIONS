'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Flame, 
  AlertTriangle, 
  ShoppingBag, 
  Sparkles, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Eye,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../../lib/api';
import { useTheme } from '../../context/ThemeContext';
import { getScarcityPieces, getScarcityText, ScarcityPieces } from '../../lib/scarcity';

interface LimitedStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  piecesCount?: ScarcityPieces;
  onBuyNow?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

// Blinking lights sequence for Light Mode
const LIGHT_MODE_LIGHTS = [
  'bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.8)]',
  'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
  'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.8)]',
  'bg-purple-600 shadow-[0_0_8px_rgba(147,51,234,0.8)]',
  'bg-sky-600 shadow-[0_0_8px_rgba(2,132,199,0.8)]',
  'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]',
];

// Blinking lights sequence for Dark Mode
const DARK_MODE_LIGHTS = [
  'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.95)]',
  'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.95)]',
  'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.95)]',
  'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.95)]',
  'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.95)]',
  'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.95)]',
];

export const LimitedStockModal: React.FC<LimitedStockModalProps> = ({
  isOpen,
  onClose,
  product,
  piecesCount: externalPiecesCount,
  onBuyNow,
  onAddToCart,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeViewers] = useState(() => Math.floor(Math.random() * 9) + 14); // 14-22 viewers
  const [lightIndex, setLightIndex] = useState(0);

  // Safely consume ThemeContext
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
  const lightColors = isDark ? DARK_MODE_LIGHTS : LIGHT_MODE_LIGHTS;

  // Stable scarcity count: 1, 2, or 3
  const effectivePieces: ScarcityPieces = 
    externalPiecesCount ?? 
    getScarcityPieces(product.id || product.slug || product.name);

  // Claim percentage based on remaining count
  const claimedPercent = effectivePieces === 1 ? '96%' : effectivePieces === 2 ? '93%' : '88%';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Blinking light sequence timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLightIndex((prev) => (prev + 1) % lightColors.length);
    }, 400);
    return () => clearInterval(interval);
  }, [isOpen, lightColors.length]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const imageUrl = product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 overflow-x-hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="limited-stock-title"
        >
          {/* Backdrop with smooth blur and hardware acceleration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className={`fixed inset-0 transition-colors duration-300 ${
              isDark 
                ? 'bg-stone-950/80 backdrop-blur-md' 
                : 'bg-stone-900/40 backdrop-blur-md'
            }`}
            style={{ willChange: 'opacity' }}
          />

          {/* Centralized Zoom-In & Zoom-Out Pop Card Widget with light & dark mode animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{
              type: 'spring',
              damping: 24,
              stiffness: 350,
              mass: 0.65,
            }}
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform, opacity',
            }}
            className={`relative z-10 w-full max-w-[490px] rounded-3xl overflow-hidden transition-all duration-300 my-auto ${
              isDark
                ? 'bg-gradient-to-b from-[#22070a] via-[#1a0507] to-[#120304] border-2 border-amber-500/40 text-stone-100 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.22)]'
                : 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EC] to-[#F5EBE0] border-2 border-amber-600/35 text-stone-900 shadow-[0_25px_60px_-12px_rgba(128,0,32,0.22),0_0_35px_rgba(217,119,6,0.18)]'
            }`}
          >
            {/* Blinking marquee changing decorative mini-lights at top border */}
            <div 
              className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                isDark 
                  ? 'bg-black/60 border-amber-500/20' 
                  : 'bg-amber-100/70 border-amber-300/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                {[0, 1, 2, 3].map((offset) => {
                  const activeColor = lightColors[(lightIndex + offset) % lightColors.length];
                  return (
                    <span 
                      key={offset}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeColor}`} 
                    />
                  );
                })}
                <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${
                  isDark ? 'text-amber-300' : 'text-amber-800'
                }`}>
                  LIVE INVENTORY ALERT
                </span>
              </div>
              <div className={`flex items-center space-x-1.5 text-[11px] font-semibold ${
                isDark ? 'text-amber-400/90' : 'text-amber-900'
              }`}>
                <Eye className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
                <span>{activeViewers} viewing now</span>
              </div>
            </div>

            {/* Close Button with zoom/rotation hover */}
            <button
              type="button"
              onClick={onClose}
              className={`absolute top-9 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md ${
                isDark
                  ? 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-amber-500/30'
                  : 'bg-white/90 hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-amber-600/30'
              }`}
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Main Content Area */}
            <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
              
              {/* Product mini header */}
              <div className="flex items-center space-x-3.5 pr-8">
                <div className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded-xl overflow-hidden shrink-0 shadow-md ${
                  isDark 
                    ? 'border border-amber-500/30 bg-stone-950' 
                    : 'border border-amber-600/30 bg-stone-100'
                }`}>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <span className={`text-[10px] uppercase tracking-widest font-mono font-bold block ${
                    isDark ? 'text-amber-400' : 'text-ruby-800'
                  }`}>
                    {product.category || 'Atelier Collection'}
                  </span>
                  <h4 className={`font-serif text-base sm:text-lg font-bold truncate mt-0.5 ${
                    isDark ? 'text-stone-100' : 'text-stone-900'
                  }`}>
                    {product.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-base font-bold ${
                      isDark ? 'text-amber-400' : 'text-ruby-700'
                    }`}>
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    {product.compare_at_price && (
                      <span className={`text-xs line-through ${
                        isDark ? 'text-stone-400' : 'text-stone-500'
                      }`}>
                        ₹{Number(product.compare_at_price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bold Urgency Highlight Card with Light & Dark Mode colors */}
              <div className={`relative p-4 sm:p-5 rounded-2xl shadow-inner overflow-hidden text-center transition-colors duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-red-950/80 via-amber-950/50 to-red-950/80 border border-red-500/40 text-amber-200'
                  : 'bg-gradient-to-r from-rose-100/90 via-amber-100/70 to-rose-100/90 border-2 border-rose-300/80 text-rose-950'
              }`}>
                {/* Background decorative glow */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none ${
                  isDark ? 'bg-red-600/20' : 'bg-rose-500/15'
                }`} />
                <div className={`absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-2xl pointer-events-none ${
                  isDark ? 'bg-amber-600/20' : 'bg-amber-500/15'
                }`} />

                <div className="relative z-10 flex flex-col items-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 animate-bounce ${
                    isDark
                      ? 'bg-red-500/20 border border-red-400/40 text-red-400'
                      : 'bg-rose-500/15 border border-rose-400/40 text-rose-600'
                  }`}>
                    <Flame className="w-5 h-5 fill-current" />
                  </div>

                  {/* Scarcity Badge explicitly stating "only 1 pieces left", "only 2 pieces left", "only 3 pieces left" */}
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-xs sm:text-sm font-black uppercase tracking-wider mb-2.5 shadow-md ${
                      isDark
                        ? 'bg-red-600 text-white shadow-red-600/40 border border-red-400/50'
                        : 'bg-rose-600 text-white shadow-rose-600/30 border border-rose-400/50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{getScarcityText(effectivePieces, true)}</span>
                  </motion.div>

                  {/* The requested explicit alert message */}
                  <h3 
                    id="limited-stock-title"
                    className={`font-serif text-lg sm:text-xl font-black uppercase tracking-wide leading-snug drop-shadow-sm ${
                      isDark ? 'text-amber-200' : 'text-burgundy-950'
                    }`}
                  >
                    MAXIMUM PRODUCTS ARE SOLD, FEW ARE LEFT, SO HURRY UP!
                  </h3>

                  <p className={`text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    This handcrafted fine jewellery piece is in unprecedented demand. <span className={`font-black underline ${
                      isDark ? 'text-amber-300' : 'text-rose-700'
                    }`}>{getScarcityText(effectivePieces)}</span> in stock!
                  </p>
                </div>
              </div>

              {/* Stock Progress Bar */}
              <div className={`space-y-1.5 p-3 rounded-xl border transition-colors duration-300 ${
                isDark 
                  ? 'bg-black/40 border-white/5' 
                  : 'bg-white/80 border-amber-200/60 shadow-sm'
              }`}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={`flex items-center gap-1 font-bold ${
                    isDark ? 'text-red-400' : 'text-rose-600'
                  }`}>
                    <AlertTriangle className="w-3.5 h-3.5" /> Almost Sold Out
                  </span>
                  <span className={`font-mono font-bold ${
                    isDark ? 'text-amber-300' : 'text-amber-700'
                  }`}>{claimedPercent} Claimed</span>
                </div>
                {/* Progress track */}
                <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 border ${
                  isDark 
                    ? 'bg-stone-800 border-stone-700/50' 
                    : 'bg-stone-200 border-stone-300/80'
                }`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: claimedPercent }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full shadow-md ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                        : 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.45)]'
                    }`}
                  />
                </div>
                <div className={`flex justify-between items-center text-[10px] pt-0.5 ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  <span>Ordered 48 times in the last 24 hrs</span>
                  <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    Fast Dispatch
                  </span>
                </div>
              </div>

              {/* Guarantee highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className={`flex items-center space-x-1.5 p-2 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-stone-900/60 border-white/5 text-stone-300' 
                    : 'bg-white/80 border-amber-200/70 text-stone-700'
                }`}>
                  <Zap className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span className="truncate font-medium">Instant Order Lock</span>
                </div>
                <div className={`flex items-center space-x-1.5 p-2 rounded-lg border transition-colors duration-300 ${
                  isDark 
                    ? 'bg-stone-900/60 border-white/5 text-stone-300' 
                    : 'bg-white/80 border-amber-200/70 text-stone-700'
                }`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <span className="truncate font-medium">COD Available</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {onBuyNow && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBuyNow(product);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 active:scale-[0.98] ${
                      isDark
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 hover:brightness-110 shadow-lg shadow-amber-500/25'
                        : 'bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 text-white hover:brightness-105 shadow-lg shadow-rose-600/30'
                    }`}
                  >
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Hurry Up & Claim Yours Now</span>
                  </button>
                )}

                {onAddToCart && (
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 active:scale-[0.98] ${
                      isDark
                        ? 'bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/30 hover:border-amber-400/60'
                        : 'bg-white hover:bg-stone-50 text-rose-900 border-2 border-rose-300 hover:border-rose-400'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Shopping Bag Before Gone</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className={`w-full py-1.5 text-center text-xs transition-colors ${
                    isDark 
                      ? 'text-stone-400 hover:text-stone-200' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
