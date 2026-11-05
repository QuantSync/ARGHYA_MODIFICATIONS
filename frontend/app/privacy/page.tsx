'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { PrivacyPolicyFullDocument } from '../../components/PrivacyPolicyContent';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:underline transition-all mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] font-mono font-semibold text-black dark:text-white border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3.5 py-1 rounded-full">
            <Shield size={12} />
            Legal & Compliance
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-black dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Your trust is our highest priority. Read our complete policies on personal data protection and secure transactions.
          </p>
        </div>

        {/* Full Document Card */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-10 shadow-lg">
          <PrivacyPolicyFullDocument />
        </div>
      </div>
    </div>
  );
}
