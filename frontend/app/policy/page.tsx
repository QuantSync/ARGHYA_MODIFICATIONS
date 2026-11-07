'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, RefreshCw, Tag, X, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { BulgeWidget } from '../../components/BulgeWidget';
import { motion, AnimatePresence } from 'framer-motion';
import { PrivacyPolicyFullDocument, PRIVACY_POLICY_SUMMARY_POINTS } from '../../components/PrivacyPolicyContent';

const POLICIES = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'Shipping Policy',
    points: [
      'We offer reliable express delivery across all serviceable pincodes throughout India.',
      'Prepaid orders are dispatched with premium complimentary shipping; Cash on Delivery orders may carry a minimal handling fee.',
      'All orders are processed and handed over to trusted logistics partners within 24 to 48 business hours.',
      'Estimated delivery timeline is 4–7 business days depending on delivery location and state transit regulations.',
      'Real-time tracking links via SMS and email are sent automatically once your package is dispatched.',
      'Every order is packaged in tamper-evident, damage-proof protective luxury boxes.',
    ],
  },
  {
    id: 'privacy',
    icon: Lock,
    title: 'Privacy Policy',
    points: PRIVACY_POLICY_SUMMARY_POINTS,
  },
  {
    id: 'return',
    icon: RefreshCw,
    title: 'Return Policy',
    points: [
      'Quality Guarantee: If you receive a damaged, defective, or incorrect piece, submit unboxing photo/video proof within 72 hours of delivery.',
      'Items must be unworn, in pristine original condition, with security tags and original luxury packaging intact.',
      'Store credit or replacement will be initiated immediately upon return package verification.',
      'Customized or final-clearance items are non-returnable unless defective on arrival.',
      'To initiate a return request, contact our care team on WhatsApp at +91-88828 27148 or email care.arghya@gmail.com.',
    ],
  },
  {
    id: 'replacement',
    icon: ShieldCheck,
    title: 'Replacement Policy',
    points: [
      'Transit Damage or Defect: Eligible for immediate, hassle-free replacement with zero additional shipping charges.',
      'Submit clear photos/unboxing video showing the defect to care.arghya@gmail.com or WhatsApp within 72 hours.',
      'Once verified, our logistics team arranges a priority reverse pickup from your doorstep.',
      'The replacement piece is dispatched promptly upon handover of the returned item.',
    ],
  },
  {
    id: 'exchange',
    icon: RotateCcw,
    title: 'Exchange Policy',
    points: [
      'Size & Variant Exchanges: Exchanges for size or alternative designs are supported within 7 days of delivery.',
      'Items must be unused, unwashed, and retained in original box packaging with all tags attached.',
      'If the desired size is out of stock, full store credit will be issued with lifetime validity.',
      'Reverse pickup is coordinated conveniently through our national courier network.',
    ],
  },
  {
    id: 'sale',
    icon: Tag,
    title: 'Sale Policy',
    points: [
      'Promotional and sale prices are valid only for the duration of the specified sale event and may be withdrawn or altered without prior notice.',
      'All items purchased during a sale event are sold on a final-sale basis — returns, exchanges, and cancellations are not accepted.',
      'Discount codes and promotional offers cannot be combined with active sale prices unless explicitly stated in the offer terms.',
      'Arghya reserves the right to cancel any order placed at an erroneous price arising from a technical or typographical error on the website.',
      'In the event of order cancellation due to a pricing error, customers will be notified promptly and a full refund will be issued within 5 business days.',
      'Limited-edition and handcrafted fine jewellery pieces offered during sale events are available in strictly finite quantities — first come, first served.',
    ],
  },
];

interface PolicyCardProps {
  policy: (typeof POLICIES)[0];
  sectionIndex: number;
  onClick: () => void;
}

function PolicyCard({ policy, onClick }: PolicyCardProps) {
  return (
    <BulgeWidget onClick={onClick} liftY={-4} scaleHover={1.015} className="w-full block">
      <section
        id={policy.id}
        aria-labelledby={`${policy.id}-heading`}
        className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 shadow-sm hover:shadow-md transition-all overflow-hidden w-full text-left cursor-pointer"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white rounded-l-3xl"
          aria-hidden="true"
        />

        <div className="px-8 py-10 sm:px-12 sm:py-12">
          <div className="flex items-start gap-4 mb-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm text-black dark:text-white"
              aria-hidden="true"
            >
              <policy.icon size={22} />
            </div>

            <h2
              id={`${policy.id}-heading`}
              className="text-2xl sm:text-3xl font-bold tracking-wide leading-tight text-black dark:text-white font-serif"
            >
              {policy.title}
            </h2>
          </div>

          {/* Static Bullet Points (Instant Direct Display) */}
          {policy.id === 'privacy' && (
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Latest Revision: 5 November 2026
            </div>
          )}

          <ul className="space-y-4 pl-0" role="list">
            {policy.points.map((point, pointIdx) => (
              <li key={pointIdx} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                  aria-hidden="true"
                />
                <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 break-words font-sans">
                  {point}
                </p>
              </li>
            ))}
          </ul>

          {policy.id === 'privacy' && (
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <span className="text-neutral-500 dark:text-neutral-400">
                Covers Razorpay integration, data security, rights & grievance officer.
              </span>
              <span className="font-bold underline text-black dark:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Full Legal Policy →
              </span>
            </div>
          )}
        </div>
      </section>
    </BulgeWidget>
  );
}

export default function PolicyPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof POLICIES)[0] | null>(null);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (selectedPolicy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPolicy]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:underline transition-all mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="text-center space-y-3 mb-14">
          <span className="inline-block text-[10px] uppercase tracking-[0.35em] font-mono font-semibold text-black dark:text-white border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-1 rounded-full">
            Arghya
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-black dark:text-white">
            Our Policies
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Transparency, trust, and timeless care — the cornerstones of everything we do at Arghya.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {POLICIES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {POLICIES.map((policy, idx) => (
            <PolicyCard key={policy.id} policy={policy} sectionIndex={idx} onClick={() => setSelectedPolicy(policy)} />
          ))}
        </div>

        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-16 mb-8 leading-relaxed">
          These policies were last updated on 5 November 2026. For any queries, please contact us at{' '}
          <a
            href="mailto:care@arghyya.com"
            className="underline font-semibold text-black dark:text-white hover:opacity-80 transition-opacity"
          >
            care@arghyya.com
          </a>
        </p>
      </div>

      <AnimatePresence>
        {selectedPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedPolicy(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-2xl z-10"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 bg-black dark:bg-white rounded-l-3xl"
                aria-hidden="true"
              />
              <button
                onClick={() => setSelectedPolicy(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={22} className="text-black dark:text-white" />
              </button>

              <div className="px-8 py-10 sm:px-12 sm:py-12">
                <div className="flex items-start gap-4 mb-8">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white shadow-sm"
                    aria-hidden="true"
                  >
                    <selectedPolicy.icon size={22} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-wide leading-tight text-black dark:text-white font-serif pr-8">
                    {selectedPolicy.title}
                  </h2>
                </div>

                {selectedPolicy.id === 'privacy' ? (
                  <PrivacyPolicyFullDocument />
                ) : (
                  <ul className="space-y-4 pl-0" role="list">
                    {selectedPolicy.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                          aria-hidden="true"
                        />
                        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 break-words font-sans">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
