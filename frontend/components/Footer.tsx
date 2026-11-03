'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-[#1F1F1F] select-none">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[300px]">

        {/* ─── COLUMN 1: LEFT SIDE (LOGO + ABOUT US) ─── */}
        <div className="md:col-span-6 flex flex-col border-b md:border-b-0 md:border-r border-[#1F1F1F]">
          {/* Top Half: Arghya Logo from Image 1 */}
          <div className="flex-1 flex items-center justify-center p-8 sm:p-10 border-b border-[#1F1F1F]">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/images/arghya-footer-logo-cropped.png"
                alt="Arghya - Slay Everyday"
                width={260}
                height={87}
                className="h-16 sm:h-20 w-auto object-contain brightness-105"
                priority
              />
            </Link>
          </div>

          {/* Bottom Half: About Us with Direct Link */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 mb-3 w-fit"
            >
              <h3 className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase text-white group-hover:text-neutral-300 transition-colors">
                ABOUT US
              </h3>
              <span className="text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-xs">
                →
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed max-w-xl">
              At Arghya, we believe elegance isn&apos;t about being noticed, it&apos;s about being remembered. Every piece is thoughtfully chosen to celebrate your individuality, turning everyday moments into something special.
            </p>
          </div>
        </div>

        {/* ─── COLUMN 2: MIDDLE (CARE LINKS) ─── */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-[#1F1F1F] p-8 sm:p-10 flex flex-col items-center justify-start text-center">
          <h4 className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase text-white mb-6">
            CARE
          </h4>
          <nav className="flex flex-col items-center space-y-3.5 w-full">
            <Link
              href="/policy#shipping"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Shipping Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/policy#return"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Return Policy
            </Link>
            <Link
              href="/policy#privacy"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policy#replacement"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Replacement Policy
            </Link>
            <Link
              href="/policy#exchange"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Exchange Policy
            </Link>
            <Link
              href="/about"
              className="text-xs sm:text-[13px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide"
            >
              Careers
            </Link>
          </nav>
        </div>

        {/* ─── COLUMN 3: RIGHT SIDE (CONTACT US & COPYRIGHT) ─── */}
        <div className="md:col-span-3 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase text-white mb-6 text-center md:text-left">
              CONTACT US
            </h4>
            <p className="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed text-center md:text-left">
              For any queries, please reach out to us between 10:30 AM to 5:30 PM, Monday to Saturday.
              <span className="block mt-2">
                WhatsApp here:{' '}
                <a
                  href="https://wa.me/918882827148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-medium inline-block underline-offset-2"
                >
                  +91-88828 27148
                </a>
              </span>
            </p>
          </div>

          <div className="pt-8 md:pt-14 text-center md:text-left">
            <p className="font-sans text-xs text-neutral-400">
              © 2026 ARGHYA All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
