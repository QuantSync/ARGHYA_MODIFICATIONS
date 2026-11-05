'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Crown, Code2, Users, ChevronDown, Sparkles, ShieldCheck, Heart, Eye, Gem } from 'lucide-react';
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
      'The creative force behind ARGHYA — Kanishk blends timeless elegance with modern affordable luxury, curating signature fine jewellery pieces that empower everyday confidence and celebrate individuality.',
    icon: <Crown size={28} />,
    delay: 0.1,
  },
  {
    role: 'Co-Founder',
    roleLabel: 'CO-FOUNDER & STRATEGY',
    name: 'Mohnish Gaur',
    email: 'mohnish02920@gmail.com',
    bio:
      'Mohnish steers the brand strategy and customer experience at ARGHYA, ensuring every piece of pure 925 silver and anti-tarnish jewelry reaches women across India with supreme quality and prompt service.',
    icon: <Users size={28} />,
    delay: 0.22,
  },
  {
    role: 'Chief Of Technical Operations',
    roleLabel: 'CHIEF OF TECHNICAL OPS',
    name: 'Anubhav Singh Rajput',
    bio:
      'Anubhav architects the digital technology ecosystem of ARGHYA — crafting a secure, responsive, and seamless shopping journey from first glance to doorstep unboxing.',
    icon: <Code2 size={28} />,
    delay: 0.34,
  },
];

/* ──────────────────────────────────────────────────
   Single Team Card
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
      whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 320, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      className="relative group rounded-3xl overflow-hidden cursor-default"
      style={{ isolation: 'isolate' }}
    >
      <div
        className={`absolute -inset-px rounded-3xl transition-opacity duration-300 pointer-events-none bg-neutral-300 dark:bg-neutral-700 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-colors duration-300 h-full flex flex-col gap-5">
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

        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1 font-sans min-h-[72px]">
          {member.bio}
        </p>

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-black dark:text-white hover:underline transition-colors"
          >
            <Mail size={14} />
            {member.email}
          </a>
        )}

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
   Jewellery FAQ Data & Component
────────────────────────────────────────────────── */
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
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-8">
      <div className="text-center space-y-3 mb-10">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-black dark:text-white font-bold px-3.5 py-1 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
          <Sparkles size={12} className="text-black dark:text-white" /> Answers &amp; Insights
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
          Everything you need to know about our jewellery craftsmanship, purity standards, and shopping experience.
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
          <span className="text-neutral-400 dark:text-neutral-600 text-sm select-none">✦</span>
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>

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
   About Us Page (Updated from Brand Document)
────────────────────────────────────────────────── */
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* ── 1. Hero / Main Manifesto ── */}
      <section className="relative py-20 sm:py-24 px-4 text-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
            <Gem size={13} className="text-black dark:text-white" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-black dark:text-white font-bold">
              OFFERING! A Feeling Called ARGHYA
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white leading-tight">
            A Feeling Called ARGHYA
          </h1>

          {/* Subheading Quote */}
          <p className="font-serif text-lg sm:text-2xl italic text-neutral-800 dark:text-neutral-200 tracking-wide">
            &ldquo;Some things are worn. Some things are remembered.&rdquo;
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700" />
            <span className="text-neutral-400 dark:text-neutral-600 text-lg select-none">✦</span>
            <div className="w-16 h-px bg-neutral-300 dark:bg-neutral-700" />
          </div>

          {/* Primary Story Text from Document */}
          <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed pt-2">
            <p>
              At <strong className="font-bold text-black dark:text-white">ARGHYA</strong>, we believe jewellery is more than an accessory.
              It&apos;s an expression of who you are, a reflection of your personality, and a little piece of confidence you carry wherever you go.
            </p>
            <p>
              Born from a love for timeless elegance and contemporary fashion, ARGHYA brings together thoughtfully curated designs that make everyday moments feel extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Philosophy Highlight Card ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-3xl p-8 sm:p-12 bg-black text-white dark:bg-neutral-900 dark:text-white border border-neutral-800 shadow-xl text-center space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
            <Heart size={13} className="text-red-400 fill-current" />
            <span>Our Philosophy</span>
          </div>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-snug font-normal max-w-2xl mx-auto">
            &ldquo;Luxury should feel personal, style should feel effortless, and beauty should never come with an unreasonable price tag.&rdquo;
          </p>
          <div className="w-12 h-0.5 bg-white/40 mx-auto" />
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
            From delicate everyday essentials to statement pieces that turn heads, every ARGHYA creation is chosen to complement your individuality and celebrate your unique style.
          </p>
          <p className="text-xs sm:text-sm font-medium text-neutral-200 italic pt-2">
            We believe every woman deserves to feel beautiful, confident, and special &mdash; not just on occasions, but every single day.
          </p>
        </div>
      </section>

      {/* ── 3. Our Promise & Our Vision (2-Column Feature Cards) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Our Promise */}
          <div className="rounded-3xl p-8 sm:p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold text-neutral-500 dark:text-neutral-400 block">
                Commitment to Excellence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white">
                Our Promise
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                We are here to make beautiful jewellery accessible without compromising on style, quality, or experience.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="font-serif text-base sm:text-lg italic text-black dark:text-white font-medium">
                &ldquo;Because you don&apos;t need a special occasion to feel special.&rdquo;
              </p>
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div className="rounded-3xl p-8 sm:p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-sm">
                <Eye size={24} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold text-neutral-500 dark:text-neutral-400 block">
                The Journey Ahead
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                To become more than just a jewellery destination &mdash; to become a part of your everyday stories, celebrations, memories, and moments of self-expression.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-500 dark:text-neutral-400 uppercase">
                  ARGHYA
                </p>
                <p className="font-sans text-sm font-bold tracking-widest text-black dark:text-white uppercase">
                  SLAY EVERYDAY
                </p>
              </div>
              <Sparkles size={20} className="text-neutral-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Team Section ── */}
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

      {/* ── 5. Frequently Asked Questions (FAQs) ── */}
      <FaqSection />

      {/* ── 6. Bottom Brand Banner & Delivery Strip ── */}
      <section className="relative bg-neutral-50 dark:bg-neutral-950 border-y border-neutral-200 dark:border-neutral-800 py-16 sm:py-20 px-4 overflow-hidden min-h-[220px]">
        <DeliveryAnimation />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400 font-bold">
            ARGHYA &bull; FINE JEWELLERY
          </span>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-black dark:text-white font-medium leading-relaxed italic">
            &ldquo;Because you don&apos;t need a special occasion to feel special.&rdquo;
          </p>
          <div className="pt-2">
            <span className="inline-block px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-sans text-xs sm:text-sm font-bold tracking-[0.25em] uppercase shadow-md">
              SLAY EVERYDAY
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
