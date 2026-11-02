import React from 'react';
import { Sparkles } from 'lucide-react';

interface FestiveOfferButtonProps {
  onClick: () => void;
  className?: string;
}

export const FestiveOfferButton: React.FC<FestiveOfferButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg overflow-hidden animate-flag-wave hover:opacity-90 transition-opacity z-10 ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)',
        borderLeft: '3px solid #FFD700',
        transformOrigin: 'left center',
        marginLeft: '-2px'
      }}
    >
      <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
      <Sparkles className="w-3 h-3 mr-2 text-yellow-300" />
      <span className="mr-2">Festive Offers</span>
    </button>
  );
};
