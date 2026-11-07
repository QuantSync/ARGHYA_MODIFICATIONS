'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ExternalLink, ShieldCheck, CheckCheck } from 'lucide-react';

interface WhatsAppModalWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModalWidget: React.FC<WhatsAppModalWidgetProps> = ({ isOpen, onClose }) => {
  const handleRedirect = () => {
    window.open(
      'https://api.whatsapp.com/message/PAW42DUMN2FKK1?autoload=1&app_absent=0',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Blurred Backdrop */}
          <motion.div
            key="whatsapp-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* WhatsApp Green Card Modal Container */}
          <motion.div
            key="whatsapp-modal-card"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative w-full max-w-sm rounded-3xl bg-[#0b141a] border border-[#00a884]/30 shadow-[0_20px_60px_rgba(0,168,132,0.25)] overflow-hidden text-stone-100 z-10"
          >
            {/* Header bar - Official WhatsApp Emerald (#075E54) */}
            <div className="relative px-6 py-5 bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#075E54] flex items-center justify-between border-b border-[#00a884]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-stone-950 shadow-md">
                  <MessageCircle size={22} className="fill-stone-950 text-[#25D366]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-base text-white tracking-wide">
                      Arghyya Support
                    </span>
                    <ShieldCheck size={16} className="text-[#25D366]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100/80 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>Official Helpline &bull; Online</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-emerald-100 hover:text-white transition-colors"
                aria-label="Close WhatsApp modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat preview body */}
            <div className="p-6 space-y-5 bg-[#0b141a] bg-[radial-gradient(#111b21_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Automated Welcome Bubble */}
              <div className="p-3.5 rounded-2xl rounded-tl-xs bg-[#202c33] border border-white/5 text-xs text-stone-200 leading-relaxed shadow-sm">
                <div className="font-semibold text-[#25D366] mb-1 flex items-center justify-between">
                  <span>ARGHYA</span>
                  <CheckCheck size={14} className="text-[#53bdeb]" />
                </div>
                Namaste! 🙏 Welcome to Arghyya Helpline. Click below to chat directly with our jewellery concierge team on WhatsApp.
              </div>

              {/* Option 1: @arghyahelpline Bulge Button Card */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 px-1">
                  Primary Helpline Contact
                </span>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={handleRedirect}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] text-stone-950 font-bold shadow-lg shadow-[#25D366]/20 border border-white/30 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-stone-950/10 flex items-center justify-center">
                      <MessageCircle size={20} className="fill-stone-950 text-[#25D366]" />
                    </div>
                    <div className="text-left">
                      <div className="font-extrabold text-sm tracking-wide group-hover:underline">
                        @arghyahelpline
                      </div>
                      <div className="text-[10px] text-stone-900/80 uppercase font-semibold tracking-wider">
                        Click to Chat on WhatsApp
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-stone-950/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink size={16} className="text-stone-950" />
                  </div>
                </motion.button>
              </div>

              <div className="text-center pt-1">
                <p className="text-[10px] text-stone-400 font-medium">
                  Instant Support for Orders, Customization & Tracking
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
