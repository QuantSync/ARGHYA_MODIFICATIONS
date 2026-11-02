'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Instagram, Globe } from 'lucide-react';
import { InstagramButton } from './buttons/InstagramButton';
import { LinkedinButton } from './buttons/LinkedinButton';
import { YoutubeButton } from './buttons/YoutubeButton';
import { TwitterButton } from './buttons/TwitterButton';
import { DiscordButton } from './buttons/DiscordButton';
import { MetaButton } from './buttons/MetaButton';
import { TelegramButton } from './buttons/TelegramButton';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white border-t border-neutral-200 dark:border-neutral-800 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Column */}
        <div className="space-y-4">
          <div>
            <h3 className="font-serif text-3xl font-bold tracking-widest text-black dark:text-white">ARGHYA</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-800 dark:text-neutral-300 font-semibold block">SLAY EVERYDAY</span>
          </div>
          <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
            Celebrating royal Indian heritage, timeless craftsmanship, and Affordable Premium couture tailored for the modern woman.
          </p>

          {/* ── Social Media Buttons ── */}
          <div
            role="list"
            aria-label="Social media links"
            className="flex flex-wrap items-center gap-2 pt-2"
          >
            <div role="listitem"><TwitterButton /></div>
            <div role="listitem"><InstagramButton /></div>
            <div role="listitem"><LinkedinButton /></div>
            <div role="listitem"><YoutubeButton /></div>
            <div role="listitem"><MetaButton /></div>
            <div role="listitem"><DiscordButton /></div>
            <div role="listitem"><TelegramButton /></div>
          </div>
        </div>

        {/* Contact Info matching Business Card */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-black dark:text-white font-bold mb-4">Contact Atelier</h4>
          <ul className="space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center space-x-2.5">
              <Mail size={16} className="text-black dark:text-white flex-shrink-0" />
              <a href="mailto:care.arghya@gmail.com" className="hover:text-black dark:hover:text-white hover:underline font-medium">care.arghya@gmail.com</a>
            </li>
            <li className="flex items-start space-x-2.5">
              <Phone size={16} className="text-black dark:text-white flex-shrink-0 mt-0.5" />
              <span className="font-medium">+91-8882827148</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Instagram size={16} className="text-black dark:text-white flex-shrink-0" />
              <span className="font-medium">@arghyyaofficial</span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Globe size={16} className="text-black dark:text-white flex-shrink-0" />
              <a href="https://www.arghyya.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white hover:underline font-medium uppercase tracking-wider">WWW.ARGHYYA.COM</a>
            </li>
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-black dark:text-white font-bold mb-4">Collections</h4>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <li><Link href="/products?category=Navratri" className="hover:text-black dark:hover:text-white transition-colors">Navratri Collection</Link></li>
            <li><Link href="/products?category=Kurti" className="hover:text-black dark:hover:text-white transition-colors">Traditional and Ethnic Kurtis</Link></li>
            <li><Link href="/products?category=Skirt" className="hover:text-black dark:hover:text-white transition-colors">Trendy and Popular Skirts</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-black dark:text-white font-bold mb-4">Newsletter</h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">Receive invitations to private collection unveils &amp; trunk shows.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white text-xs px-3 py-2 rounded-l focus:outline-none focus:border-black dark:focus:border-white flex-1"
            />
            <button className="bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-r transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
        © {new Date().getFullYear()} ARGHYA Atelier. WWW.ARGHYYA.COM. All Rights Reserved.
      </div>
    </footer>
  );
};
