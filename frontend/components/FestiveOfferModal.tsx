import React from 'react';
import { X, Gift, Zap, Sparkles } from 'lucide-react';

interface FestiveOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FestiveOfferModal: React.FC<FestiveOfferModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-stone-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform scale-100 transition-transform duration-500 animate-in fade-in zoom-in-95">
        
        {/* Animated Header */}
        <div className="relative h-40 bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
          
          {/* Animated floating elements */}
          <div className="absolute top-2 left-10 text-white/40 animate-ping">✨</div>
          <div className="absolute bottom-4 right-12 text-white/40 animate-bounce">🎇</div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <Gift className="w-10 h-10 text-yellow-300 mb-2 animate-bounce relative z-10 drop-shadow-md" />
          
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-widest text-center z-10 shadow-sm">
            FESTIVE SEASON SALE
          </h2>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6 text-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] dark:bg-none">
          <p className="text-burgundy-900 dark:text-stone-300 text-sm sm:text-base font-medium leading-relaxed">
            Celebrate the season with exclusive Arghya deals! <br className="hidden sm:block" />
            Unwrap happiness with our specially curated festive offers.
          </p>
          
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-stone-800/80 p-4 rounded-2xl border border-amber-200 dark:border-stone-700 flex items-center justify-between group hover:border-amber-400 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 text-amber-700 dark:text-amber-400">
                <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">Flat 40% Off</span>
              </div>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-lg shadow-sm border border-stone-100 dark:border-stone-800">
                FESTIVE40
              </span>
            </div>

            <div className="bg-rose-50 dark:bg-stone-800/80 p-4 rounded-2xl border border-rose-200 dark:border-stone-700 flex items-center justify-between group hover:border-rose-400 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 text-rose-700 dark:text-rose-400">
                <div className="bg-rose-100 dark:bg-rose-500/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">Buy 2 Get 1 Free</span>
              </div>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-lg shadow-sm border border-stone-100 dark:border-stone-800">
                B2G1FREE
              </span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-burgundy-900 to-burgundy-800 dark:from-amber-600 dark:to-amber-500 text-white dark:text-stone-950 font-bold uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-burgundy-900/20 dark:shadow-amber-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center space-x-2"
          >
            <span>Start Shopping</span>
          </button>
        </div>

      </div>
    </div>
  );
};
