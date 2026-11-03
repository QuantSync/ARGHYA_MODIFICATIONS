'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-[#262626] select-none overflow-hidden">
      {/* 
        Full-width Edge-to-Edge Grid (0 side margins on laptop / desktop):
        - Column 1: ~49% width (Logo top, About Us bottom)
        - Column 2: ~28% width (CARE links)
        - Column 3: ~23% width (CONTACT US & Copyright)
      */}
      <div className="w-full flex flex-col md:flex-row min-h-[380px] lg:min-h-[420px]">

        {/* ─── COLUMN 1: LEFT SIDE (LOGO + ABOUT US) ─── */}
        <div className="w-full md:w-[49%] flex flex-col border-b md:border-b-0 md:border-r border-[#262626]">
          {/* Top Half: Arghya Logo from Image 1 */}
          <div className="flex-1 flex items-center justify-center p-8 sm:p-10 lg:p-12 border-b border-[#262626] min-h-[160px] lg:min-h-[190px]">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/images/arghya-footer-logo-cropped.png"
                alt="Arghya - Slay Everyday"
                width={320}
                height={107}
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain brightness-105"
                priority
              />
            </Link>
          </div>

          {/* Bottom Half: About Us */}
          <div className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 mb-3.5 w-fit"
            >
              <h3 className="font-sans font-bold text-base sm:text-lg lg:text-xl tracking-wider uppercase text-white group-hover:text-neutral-300 transition-colors">
                ABOUT US
              </h3>
              <span className="text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sm">
                →
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm lg:text-[15px] text-neutral-300 leading-relaxed max-w-2xl">
              At Arghya, we believe elegance isn&apos;t about being noticed, it&apos;s about being remembered. Every piece is thoughtfully chosen to celebrate your individuality, turning everyday moments into something special.
            </p>
          </div>
        </div>

        {/* ─── COLUMN 2: MIDDLE (CARE LINKS) ─── */}
        <div className="w-full md:w-[28%] border-b md:border-b-0 md:border-r border-[#262626] p-8 sm:p-10 lg:p-12 flex flex-col items-center justify-start text-center">
          <h4 className="font-sans font-bold text-base sm:text-lg lg:text-xl tracking-wider uppercase text-white mb-6 lg:mb-8">
            CARE
          </h4>
          <nav className="flex flex-col items-center space-y-3.5 sm:space-y-4 lg:space-y-4.5 w-full">
            <Link
              href="/policy#shipping"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Shipping Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/policy#return"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Return Policy
            </Link>
            <Link
              href="/policy#privacy"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policy#replacement"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Replacement Policy
            </Link>
            <Link
              href="/policy#exchange"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Exchange Policy
            </Link>
            <Link
              href="/about"
              className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 hover:text-white transition-colors duration-200 tracking-wide font-normal hover:underline underline-offset-4"
            >
              Careers
            </Link>
          </nav>
        </div>

        {/* ─── COLUMN 3: RIGHT SIDE (CONTACT US & COPYRIGHT) ─── */}
        <div className="w-full md:w-[23%] p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-bold text-base sm:text-lg lg:text-xl tracking-wider uppercase text-white mb-6 lg:mb-8 text-center md:text-left">
              CONTACT US
            </h4>
            <div className="font-sans text-xs sm:text-sm lg:text-[15px] text-neutral-300 leading-relaxed text-center md:text-left space-y-2">
              <p>
                For any queries, please reach out to us between 10:30 AM to 5:30 PM, Monday to Saturday.
              </p>
              <p className="pt-1">
                WhatsApp here:{' '}
                <a
                  href="https://wa.me/918882827148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline font-medium inline-block underline-offset-4"
                >
                  +91-88828 27148
                </a>
              </p>
            </div>
          </div>

          <div className="pt-10 md:pt-16 text-center md:text-left">
            <p className="font-sans text-xs sm:text-sm text-neutral-400">
              © 2026 ARGHYA All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
