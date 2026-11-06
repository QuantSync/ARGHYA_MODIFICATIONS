'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Sparkles, MessageCircle, Mail, ArrowRight } from 'lucide-react';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    category: 'Material & Purity',
    question: 'What materials are used in ARGHYA jewellery?',
    answer:
      'We specialize in authenticated 925 Sterling Silver (92.5% purity) stamped with standard purity hallmarks, along with premium anti-tarnish stainless steel and copper alloys coated with advanced protective finishes that prevent skin greening and resist moisture.',
  },
  {
    category: 'Anti-Tarnish',
    question: 'How does the Anti-Tarnish guarantee work?',
    answer:
      'Our anti-tarnish collections feature an electroplated protective barrier that shields against oxidation, sweat, and environmental exposure. With standard daily care, they preserve their golden or silver brilliance for months without fading.',
  },
  {
    category: 'Everyday Care',
    question: 'How should I care for my ARGHYA jewellery?',
    answer:
      'Keep your pieces glowing by storing them in an airtight box or soft pouch when not in use. Avoid direct spraying of strong perfumes, harsh hairsprays, or chemical detergents on the metal surfaces, and gently wipe with a soft cloth after wearing.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does shipping take across India?',
    answer:
      'We offer Free Shipping across all serviceable PIN codes in India. Orders are dispatched from our atelier within 24 hours. Delivery typically takes 2 to 4 business days, complete with real-time tracking updates via SMS and WhatsApp.',
  },
  {
    category: 'Payments & COD',
    question: 'Which payment methods are accepted? Is Cash on Delivery available?',
    answer:
      'We offer Cash on Delivery (COD) across India. For prepaid checkouts, we accept 100% secure payments powered by Razorpay, including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.',
  },
  {
    category: 'Returns & Exchange',
    question: 'What is ARGHYA’s return and exchange policy?',
    answer:
      'We take pride in our craftsmanship. If you receive an item with any manufacturing defect or transit issue, you can request an easy exchange or return within 7 days of delivery with its original tags and packaging intact.',
  },
  {
    category: 'Material & Purity',
    question: 'Is ARGHYA jewellery hypoallergenic and nickel-free?',
    answer:
      'Yes! All ARGHYA pure silver and anti-tarnish pieces are completely lead-free, nickel-free, and hypoallergenic, engineered specifically to be kind on sensitive Indian skin types without causing redness or irritation.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How can I track my shipment?',
    answer:
      'Once your order is handed to our courier partners (Bluedart, Delhivery, or Xpressbees), you will instantly receive an SMS and WhatsApp message containing your direct tracking link and AWB number.',
  },
];

const CATEGORIES = [
  'All',
  'Material & Purity',
  'Anti-Tarnish',
  'Everyday Care',
  'Shipping & Delivery',
  'Payments & COD',
  'Returns & Exchange',
];

export default function FaqsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-24">
      {/* ── Top Header Section ── */}
      <section className="relative border-b border-neutral-100 bg-neutral-50/60 pt-16 pb-14 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200 shadow-sm text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-neutral-700">
            <HelpCircle size={13} className="text-neutral-900" />
            <span>Help &amp; Answers</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
            Frequently Asked <span className="italic font-light">Questions</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about ARGHYA’s 925 Pure Silver, Anti-Tarnish fine jewellery, free express delivery, and lifetime care.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions (e.g. shipping, silver, care, COD)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-neutral-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-neutral-400 hover:text-neutral-700 font-bold px-1.5 py-0.5 rounded-full"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── FAQ Accordion List ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-neutral-50 border border-neutral-100">
            <p className="text-base font-serif text-neutral-700">No matching questions found.</p>
            <p className="text-xs text-neutral-500 mt-1">Try another search keyword or select &apos;All&apos; categories above.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-5 py-2 text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={faq.question}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-50/80 border-neutral-900/30 shadow-sm'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                    <span className="font-mono text-xs font-bold text-neutral-400 shrink-0 mt-0.5 sm:mt-0">
                      {numStr}
                    </span>
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200">
                        {faq.category}
                      </span>
                      <h2 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                        {faq.question}
                      </h2>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed pl-12 sm:pl-14 border-t border-neutral-200/60 mt-1">
                        <p className="pt-2">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </section>

      {/* ── Contact Support Card ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl bg-neutral-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 font-bold">
              Personalized Assistance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">Still have questions?</h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed">
              Our concierge team is available 7 days a week to help you choose sizing, care advice, or order tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/about#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-md"
            >
              <span>Contact Atelier</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

