'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, ShieldCheck, HeartHandshake, Truck, Award } from 'lucide-react';

const FAQS = [
  {
    q: 'What is ARGHYA and why is it also searched as Arghyya or arghyya.com?',
    a: 'ARGHYA (officially online at arghyya.com, commonly spelled or searched as Arghyya, Arghya, or arghya.co) is India’s signature contemporary couture brand. We blend royal traditional Indian craftsmanship with modern silhouettes — delivering handcrafted designer sarees, festive lehengas, Navratri chaniya choli sets, and everyday ethnic kurtis directly to your doorstep across India.'
  },
  {
    q: 'Where can I buy original Arghya (Arghyya) collections?',
    a: 'Original and authentic ARGHYA outfits are exclusively available on our official flagship store at arghyya.com (and www.arghyya.com). Every product is backed by our authentic craft guarantee, premium fabric certification, and verified Cash on Delivery.'
  },
  {
    q: 'Is arghyya.com the official store for Arghya?',
    a: 'Yes, arghyya.com is the verified official web boutique for ARGHYA (Arghyya Collections). You can browse our complete designer catalogue, apply exclusive seasonal coupons, and order with zero risk using Cash On Delivery.'
  },
  {
    q: 'Do you offer Cash On Delivery (COD) across India?',
    a: 'Yes, ARGHYA (arghyya.com) offers seamless Cash On Delivery (COD) alongside prepaid UPI and Card payments across 28,000+ pin codes in India, with rapid dispatch and doorstep tracking.'
  },
  {
    q: 'What makes Arghya / Arghyya sarees and couture unique?',
    a: 'Every Arghya ensemble is handpicked and tailored with focus on lightweight luxury, breathable handloom silks, authentic mirror-work trims, and festive elegance at genuinely accessible price points.'
  }
];

export const BrandSearchSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      aria-label="About ARGHYA (Arghyya Collections)"
      className="relative py-12 md:py-16 px-4 max-w-6xl mx-auto border-t border-amber-500/15 text-stone-900 dark:text-stone-100"
    >
      {/* Brand Identity Header for Google Entity Association */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>The Official Atelier of Arghya & Arghyya</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight">
          ARGHYA — <span className="text-amber-600 dark:text-amber-400">Slay Everyday</span> with Authentic Indian Couture
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
          Welcome to <strong>ARGHYA</strong> (officially at <strong>arghyya.com</strong>, also widely searched as <strong>Arghyya</strong>, <strong>Arghya</strong>, or <strong>arghya.co</strong>). 
          We craft timeless Indian ethnic fashion, festive chaniya choli sets, everyday mirror-work kurtis, 
          and royal designer sarees designed to bring affordable luxury to women across India. Whether you searched for <em>Arghya</em>, <em>Arghyya</em>, <em>arghyya.com</em>, or <em>Arghya</em>, this is the official atelier store with verified pan-India Cash on Delivery.
        </p>
      </div>

      {/* Brand Pillars Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-900/50 border border-amber-500/20 text-center">
          <Award className="w-6 h-6 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
          <h3 className="font-serif text-sm font-bold">100% Authentic</h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Guaranteed handloom craft & fabrics</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-900/50 border border-amber-500/20 text-center">
          <Truck className="w-6 h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-serif text-sm font-bold">All-India Delivery</h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Fast shipping with live order updates</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-900/50 border border-amber-500/20 text-center">
          <HeartHandshake className="w-6 h-6 mx-auto mb-2 text-rose-600 dark:text-rose-400" />
          <h3 className="font-serif text-sm font-bold">Cash On Delivery</h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Pay when your outfit reaches you</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-stone-900/50 border border-amber-500/20 text-center">
          <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-sky-600 dark:text-sky-400" />
          <h3 className="font-serif text-sm font-bold">Direct Atelier Care</h3>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Personal styling & WhatsApp support</p>
        </div>
      </div>

      {/* Semantic FAQs - Powers Google Rich Snippets */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-center mb-6 text-burgundy-900 dark:text-stone-100">
          Frequently Asked Questions About Arghya (Arghyya)
        </h3>
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="border border-stone-200 dark:border-white/10 rounded-xl overflow-hidden bg-white/70 dark:bg-stone-900/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-3.5 px-4 sm:px-5 flex items-center justify-between text-left font-serif text-sm sm:text-base font-bold text-burgundy-950 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 text-amber-500 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-white/5 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
