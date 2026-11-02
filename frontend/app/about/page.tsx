'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Crown, Code2, Users, ChevronDown, Sparkles } from 'lucide-react';
import { InlineCharkha } from '../../components/animations/InlineCharkha';
import { DeliveryAnimation } from '../../components/animations/DeliveryAnimation';

/* ──────────────────────────────────────────────────
   Team member data
────────────────────────────────────────────────── */
interface TeamMember {
  role: string;
  roleLabel: string;
  name: string;
  email?: string;
  bio: string;
  icon: React.ReactNode;
  delay: number;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    role: 'Founder',
    roleLabel: 'FOUNDER & VISIONARY',
    name: 'Kanishk Verma',
    email: 'kanishkv55@gmail.com',
    bio:
      'The creative force behind Arghya Collections — Kanishk blends royal Indian heritage with modern Affordable Premium fashion to craft an atelier that celebrates the timeless artisan spirit of India.',
    icon: <Crown size={28} />,
    delay: 0.1,
  },
  {
    role: 'Co-Founder',
    roleLabel: 'CO-FOUNDER & STRATEGY',
    name: 'Mohnish Gaur',
    email: 'mohnish02920@gmail.com',
    bio:
      'Mohnish drives the business strategy and brand partnerships at Arghya, ensuring the label\'s artisan heritage reaches every corner of India with integrity and precision.',
    icon: <Users size={28} />,
    delay: 0.22,
  },
  {
    role: 'Chief Of Technical Operations',
    roleLabel: 'CHIEF OF TECHNICAL OPS',
    name: 'Anubhav Singh Rajput',
    bio:
      'Anubhav architects the entire digital backbone of Arghya — from seamless checkout experiences to real-time inventory intelligence — keeping the platform as refined as the couture it showcases.',
    icon: <Code2 size={28} />,
    delay: 0.34,
  },
];

/* ──────────────────────────────────────────────────
   Single Team Card (Pure Black & White, Static Bio)
────────────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: member.delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.025, y: -4, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className="relative group rounded-3xl overflow-hidden cursor-default"
      style={{ isolation: 'isolate' }}
    >
      {/* ── Subtle Black/White Border Glow ── */}
      <div
        className={`absolute -inset-px rounded-3xl transition-opacity duration-300 pointer-events-none bg-neutral-300 dark:bg-neutral-700 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* ── Card body ── */}
      <div className="relative z-10 p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-colors duration-300 h-full flex flex-col gap-5">
        {/* Icon + Role */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-black dark:text-white bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            {member.icon}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-bold text-neutral-500 dark:text-neutral-400">
              {member.roleLabel}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-black dark:text-white mt-0.5 leading-tight">
              {member.name}
            </h3>
          </div>
        </div>

        {/* Static Bio - Instant Direct Display (No typing animation) */}
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1 font-sans min-h-[72px]">
          {member.bio}
        </p>

        {/* Email */}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-black dark:text-white hover:underline transition-colors"
          >
            <Mail size={14} />
            {member.email}
          </a>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-neutral-400 dark:text-neutral-600 text-sm select-none">✦</span>
          <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────
   FAQ Data & Component (Black & White Theme)
────────────────────────────────────────────────── */
interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    category: 'Heritage & Craft',
    question: 'What is the philosophy behind Arghya Collections?',
    answer:
      'Arghya was born to bridge royal Indian heritage couture with modern Affordable Premium fashion. We collaborate directly with master handloom weavers, block printers, and mirror-work artisans across Gujarat, Rajasthan, and Uttar Pradesh — eliminating distributor markups so you receive boutique-grade luxury directly from the artisans at honest prices.',
  },
  {
    category: 'Quality & Fabric',
    question: 'How does Arghya guarantee the authenticity of its fabrics and mirror work?',
    answer:
      'Every creation at Arghya is crafted using handloom-grade cottons, rich georgettes, and artisan silk blends. Our signature mirror-work trims are carefully anchored with dense, multi-thread embroidery rather than glued plastic foils — ensuring radiant festive shimmer, zero scratchiness against skin, and resilience through hours of celebratory movement.',
  },
  {
    category: 'Sizing & Fit',
    question: 'How do your sizes work, especially for "Free Size" garments?',
    answer:
      'Our signature tie-shoulder kurtis and tunics feature an adaptable Free Size A-line silhouette with adjustable shoulder ties and side dori drawstrings, effortlessly fitting bust sizes from 32" to 42" (XS through XL). Our festive Garba skirts feature dual high-waisted elastic and drawstring closures, comfortably fitting waist sizes from 26" to 38" with a full voluminous 6-meter twirl flare.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does shipping take across India?',
    answer:
      'We deliver to all serviceable PIN codes across India. Every order is quality-checked and dispatched from our atelier within 24 hours. Standard delivery takes 2 to 4 business days. As soon as your order ships, you receive an automated tracking link with live carrier updates via SMS, WhatsApp, and email.',
  },
  {
    category: 'Payments & COD',
    question: 'Which payment options are supported? Is Cash on Delivery (COD) available?',
    answer:
      'We support Cash on Delivery (COD) across eligible PIN codes nationwide. For prepaid orders, we provide 100% encrypted, secure checkouts powered by top gateways (Razorpay, UPI, Google Pay, PhonePe, Paytm, Net Banking, and all major Credit/Debit Cards).',
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is Arghya’s return and exchange policy?',
    answer:
      'Your delight is our priority. If you encounter any sizing discrepancy or garment defect, you can request a quick and convenient exchange or return within 7 days of delivery. Items simply need to remain unworn, unwashed, and in their original packaging with all artisan tags intact.',
  },
  {
    category: 'Fabric Care',
    question: 'How should I care for my Arghya handcrafted garments?',
    answer:
      'To preserve the hand-stitched mirrors, delicate tassel cords, and rich festive pigments, we recommend dry cleaning for our lehengas and fusion sets. For our cotton-blend kurtis, a gentle hand rinse in cold water with mild shampoo or liquid detergent, followed by drying flat in shade, preserves the vibrant hues and soft drape.',
  },
  {
    category: 'Custom & Group Orders',
    question: 'Can I place bulk or coordinated orders for weddings and Garba groups?',
    answer:
      'Yes! We frequently dress bridesmaid squads, sangeet troupes, and festive dance groups. For coordinated color stories or volume orders, reach out to our concierge at kanishkv55@gmail.com or via WhatsApp. Our atelier stylists will assist with group sizes and expedited dispatch.',
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
      {/* FAQ Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-black dark:text-white font-bold px-3.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
          <Sparkles size={12} className="text-black dark:text-white" /> Answers &amp; Insights
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
          Everything you need to know about our artisan heritage, craftsmanship standards, sizing, and nationwide delivery.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-neutral-400 dark:text-neutral-600 text-sm select-none">✦</span>
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const numStr = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={faq.question}
              className={`rounded-2xl transition-all duration-200 border ${
                isOpen
                  ? 'bg-neutral-50 dark:bg-neutral-900 border-black dark:border-white shadow-sm'
                  : 'bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold pt-0.5 sm:pt-0 shrink-0 ${
                      isOpen
                        ? 'text-black dark:text-white'
                        : 'text-neutral-400 dark:text-neutral-600'
                    }`}
                  >
                    {numStr}
                  </span>
                  <div className="space-y-1 min-w-0">
                    <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-black dark:text-white font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-black dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 border ${
                    isOpen
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white rotate-180'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border-neutral-200 dark:border-neutral-700'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed border-t border-neutral-200 dark:border-neutral-800 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────
   About Us Page (Pure Black & White Theme)
────────────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* ── Hero (No particle animation) ── */}
      <section className="relative py-20 px-4 text-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          {/* Eyebrow */}
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-black dark:text-white font-bold px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
            ❈ &nbsp;The Arghya Atelier&nbsp; ❈
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white leading-tight">
            About Us
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mx-auto font-sans">
            Rooted in India's royal textile heritage, Arghya is an Affordable Premium couture label that fuses
            centuries-old craftsmanship with contemporary elegance — handcrafted for the modern Indian woman.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-neutral-400 dark:text-neutral-600 text-lg select-none">✦</span>
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>
      </section>

      {/* ── Team Cards ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-bold">
            The Founding Pillars
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-black dark:text-white mt-1">
            Meet The Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {TEAM_MEMBERS.map((member, idx) => (
            <TeamCard key={member.name} member={member} idx={idx} />
          ))}
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQs) ── */}
      <FaqSection />

      {/* ── Brand story strip ── */}
      <section className="relative bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800 py-20 px-4 overflow-hidden min-h-[220px]">
        {/* Delivery Animation in background */}
        <DeliveryAnimation />

        {/* Quote content in foreground */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-bold">
            Our Promise
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <InlineCharkha size="lg" className="hidden sm:flex" />
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-black dark:text-white font-medium leading-relaxed italic flex-1">
              &ldquo;Every Product We Deliver carries the soul of India&rsquo;s finest artisans &mdash; and our commitment to you
              is that each piece remains timeless, authentic, and extraordinary.&rdquo;
            </p>
            <InlineCharkha size="lg" className="hidden sm:flex" />
          </div>
          {/* Mobile only charkhas */}
          <div className="flex justify-center gap-8 sm:hidden pt-2">
             <InlineCharkha size="md" />
             <InlineCharkha size="md" />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-widest pt-2">
            &mdash; Arghya Atelier, est. 2024
          </p>
        </div>
      </section>
    </div>
  );
}
