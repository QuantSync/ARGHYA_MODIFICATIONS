import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, UserCheck, Globe, Lock } from 'lucide-react';

export const PRIVACY_POLICY_SUMMARY_POINTS = [
  'Last Updated: 5 November 2026. We collect only necessary details (Name, Contact, Address, Device info) to fulfill orders and provide services.',
  'Payments are processed securely via PCI-DSS compliant RAZORPAY payment gateways; ARGHYA never stores your complete card, UPI PIN, or banking passwords.',
  'Personal information is strictly never sold or rented to third parties. Data is shared only with trusted logistics, payment, and hosting partners.',
  'Cookies are used to enhance shopping preferences and cart functionality, which can be managed via browser settings.',
  'You have full privacy rights to request data access, correction, deletion, or opt out of communications by contacting our support team.',
  'Appointed Grievance Officer: Mr Anubhav Singh Rajput (CTO & Director - Operations, West Delhi - 110058, INDIA). Direct Care: care@arghyya.com | +91-88828 27148.',
];

export const PrivacyPolicyFullDocument: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className="space-y-8 font-sans text-neutral-800 dark:text-neutral-200">
      {/* ── Document Header ── */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
            <Lock size={12} className="text-burgundy-700 dark:text-amber-400" />
            Official Policy
          </span>
          <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400">
            Last Updated: <strong>5 November 2026</strong>
          </span>
        </div>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
          At <strong>ARGHYA</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you visit or make a purchase from our website.
        </p>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 italic">
          By using our website, you agree to the practices described in this Privacy Policy.
        </p>
      </div>

      {/* ── 1. INFORMATION WE COLLECT ── */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Information We Collect
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          When you visit our website, create an account, or place an order, we may collect the following information:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
          {[
            'Full Name',
            'Email Address',
            'Mobile Number',
            'Billing and Shipping Address',
            'Order and Purchase History',
            'Payment Transaction Details',
            'Device Information and IP Address',
            'Browser Type and Website Usage Data',
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          We collect only the information necessary to provide our services and improve your shopping experience.
        </p>
      </section>

      {/* ── 2. HOW WE USE YOUR INFORMATION ── */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          How We Use Your Information
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          We use your personal information to:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm">
          {[
            'Process and deliver your orders.',
            'Confirm purchases and send order updates.',
            'Provide customer support.',
            'Manage returns, refunds, and exchanges.',
            'Improve our website, products, and services.',
            'Send promotional offers, discounts, and updates (where permitted).',
            'Prevent fraudulent transactions and unauthorized activities.',
            'Comply with applicable legal requirements.',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white flex-shrink-0 mt-1.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 3. PAYMENT INFORMATION ── */}
      <section className="space-y-2.5 bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 rounded-2xl">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
          Payment Information
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <strong>ARGHYA does not directly store</strong> your complete debit card, credit card, UPI PIN, or banking passwords.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Payments made through our website may be processed by secure <strong>RAZORPAY</strong> payment gateways. Such providers handle payment information according to their own privacy and security policies.
        </p>
      </section>

      {/* ── 4. COOKIES AND TRACKING TECHNOLOGIES ── */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Cookies and Tracking Technologies
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Our website may use cookies and similar technologies to:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm">
          {[
            'Improve website functionality.',
            'Remember your shopping preferences.',
            'Maintain shopping cart information.',
            'Understand website traffic and customer behaviour.',
            'Improve marketing and advertising campaigns.',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white flex-shrink-0 mt-1.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          You can manage or disable cookies through your browser settings. However, certain website features may not function properly if cookies are disabled.
        </p>
      </section>

      {/* ── 5. SHARING OF PERSONAL INFORMATION ── */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Sharing of Personal Information
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          We do not sell or rent your personal information to third parties.
        </p>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          However, we may share necessary information with trusted service providers, including:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
          {[
            'Payment Gateway Providers.',
            'Shipping and Logistics Partners.',
            'Website Hosting and Technology Providers.',
            'Marketing and Analytics Services.',
            'Customer Support Services.',
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          Information may also be disclosed when required by applicable law, government authorities, or legal proceedings.
        </p>
      </section>

      {/* ── 6. DATA SECURITY ── */}
      <section className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Data Security
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          We take reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, alteration, disclosure, or loss.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Although we strive to protect your information, no method of online transmission or electronic storage is completely secure.
        </p>
      </section>

      {/* ── 7. THIRD-PARTY LINKS ── */}
      <section className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Third-Party Links
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Our website may contain links to third-party websites or services. ARGHYA is not responsible for the privacy practices, policies, or content of external websites. We encourage customers to review their respective privacy policies.
        </p>
      </section>

      {/* ── 8. YOUR PRIVACY RIGHTS ── */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Your Privacy Rights
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Depending on applicable laws, you may have the right to:
        </p>
        <ul className="space-y-1.5 text-xs sm:text-sm">
          {[
            'Request access to your personal information.',
            'Request correction of inaccurate information.',
            'Request deletion of your personal information, subject to legal requirements.',
            'Withdraw consent for certain data processing activities.',
            'Opt out of promotional emails and marketing communications.',
            'Raise concerns regarding the processing of your personal data.',
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white flex-shrink-0 mt-1.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 pt-1">
          To exercise these rights, please contact our support team at <a href="mailto:care@arghyya.com" className="font-semibold underline hover:text-black dark:hover:text-white">care@arghyya.com</a>.
        </p>
      </section>

      {/* ── 9. CHILDREN'S PRIVACY ── */}
      <section className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Children's Privacy
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          Our website and services are not intended for children under the age of 18 without appropriate parental or guardian involvement. We do not knowingly collect personal information from children without appropriate authorization.
        </p>
      </section>

      {/* ── 10. DATA RETENTION ── */}
      <section className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Data Retention
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          We retain personal information only for as long as necessary to fulfil the purposes described in this policy, including order processing, customer support, legal compliance, accounting, and dispute resolution.
        </p>
      </section>

      {/* ── 11. CHANGES TO THIS PRIVACY POLICY ── */}
      <section className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
          Changes to this Privacy Policy
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          ARGHYA reserves the right to update or modify this Privacy Policy at any time. Any changes will be published on this page along with the updated revision date. We encourage customers to review this page periodically.
        </p>
      </section>

      {/* ── 12. GRIEVANCE OFFICER ── */}
      <section className="rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900/90 p-5 space-y-2">
        <div className="flex items-center gap-2 text-black dark:text-white">
          <UserCheck size={18} />
          <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide uppercase">
            Grievance Officer
          </h3>
        </div>
        <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
          <p className="font-semibold text-black dark:text-white text-sm sm:text-base">
            Mr Anubhav Singh Rajput
          </p>
          <p>
            <strong>Designation:</strong> CTO & Director - Operations
          </p>
          <p>
            <strong>Location:</strong> West Delhi - 110058, INDIA
          </p>
        </div>
      </section>

      {/* ── 13. CONTACT US ── */}
      <section className="rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/80 p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold font-serif tracking-wide text-black dark:text-white uppercase">
            Contact Us
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <span className="font-semibold min-w-[70px] text-neutral-500">Brand:</span>
            <span className="font-bold text-black dark:text-white">ARGHYA</span>
          </div>

          <div className="flex items-start gap-2.5">
            <Globe size={15} className="mt-0.5 text-neutral-500 flex-shrink-0" />
            <span className="font-semibold min-w-[70px] text-neutral-500">Website:</span>
            <a href="https://www.arghyya.com" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline hover:opacity-80">
              www.arghyya.com
            </a>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail size={15} className="mt-0.5 text-neutral-500 flex-shrink-0" />
            <span className="font-semibold min-w-[70px] text-neutral-500">Email:</span>
            <a href="mailto:care@arghyya.com" className="text-black dark:text-white underline hover:opacity-80">
              care@arghyya.com
            </a>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone size={15} className="mt-0.5 text-neutral-500 flex-shrink-0" />
            <span className="font-semibold min-w-[70px] text-neutral-500">Support:</span>
            <div className="space-x-2">
              <a href="tel:+918882827148" className="text-black dark:text-white underline hover:opacity-80">
                +91-88828 27148
              </a>
              <span>,</span>
              <a href="tel:+917290999906" className="text-black dark:text-white underline hover:opacity-80">
                +91-72909 99906
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:col-span-2">
            <MapPin size={15} className="mt-0.5 text-neutral-500 flex-shrink-0" />
            <span className="font-semibold min-w-[70px] text-neutral-500">Address:</span>
            <span className="text-black dark:text-white">DELHI - 110051 , INDIA</span>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 text-xs text-neutral-600 dark:text-neutral-400">
          <p>We are committed to ensuring a safe, secure, and trustworthy shopping experience for every ARGHYA customer.</p>
          <p className="font-serif font-bold text-black dark:text-white text-sm mt-1">Thank you for choosing ARGHYA.</p>
        </div>
      </section>
    </div>
  );
};

