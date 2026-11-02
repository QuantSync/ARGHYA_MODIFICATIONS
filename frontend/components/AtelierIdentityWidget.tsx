 'use client';

import React from 'react';
import { BulgeWidget } from './BulgeWidget';
import { ShiningMovingBorder } from './animations/ShiningMovingBorder';
import { CardShiningBorder } from './animations/CardShiningBorder';
import { Telegram3DButton } from './buttons/Telegram3DButton';
import { WhatsApp3DButton } from './buttons/WhatsApp3DButton';

interface AtelierIdentityWidgetProps {
  onWhatsAppClick?: () => void;
}

export const AtelierIdentityWidget: React.FC<AtelierIdentityWidgetProps> = ({ onWhatsAppClick }) => {
  const contacts = [
    { label: 'MAIL', value: 'care.arghya@gmail.com', href: 'mailto:care.arghya@gmail.com' },
    { label: 'PHONE', value: '+91-8882827148', href: 'tel:+918882827148' },
    { label: 'SOCIAL', value: '@arghyyaofficial', href: 'https://instagram.com/arghyyaofficial' },
    { label: 'WEBSITE', value: 'WWW.ARGHYYA.COM', href: 'https://www.arghyya.com' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ShiningMovingBorder roundedClassName="rounded-3xl" clickable>
        <div className="bg-cream-100 dark:bg-stone-900/80 border border-transparent rounded-3xl p-8 sm:p-10 shadow-lg text-burgundy-900 dark:text-stone-100 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left section (Title & Description) */}
            <div className="space-y-4 lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-burgundy-700 dark:text-amber-400 font-bold">
                ATELIER IDENTITY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold luxury-text-gradient">
                ARGHYA BUSSINESS
              </h2>
              <p className="text-xs leading-relaxed text-burgundy-800/80 dark:text-stone-300">
                Inspired by our brand signature business card aesthetic—combining rich deep maroon burgundy
                elegance with warm ivory cream and golden touches.
              </p>
            </div>

            {/* Right section (Contacts & Buttons) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                {contacts.map((c, i) => (
                  <BulgeWidget key={i} scaleHover={1.04} liftY={-3}>
                    <CardShiningBorder roundedClassName="rounded-xl">
                      <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-transparent space-y-1 h-full">
                        <span className="text-[10px] uppercase tracking-wider text-burgundy-700 dark:text-amber-400 font-bold block">
                          {c.label}
                        </span>
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold hover:underline block truncate text-burgundy-900 dark:text-stone-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {c.value}
                        </a>
                      </div>
                    </CardShiningBorder>
                  </BulgeWidget>
                ))}
              </div>

              {/* Action Buttons */}
              <div 
                className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start"
                onClick={(e) => e.stopPropagation()} // Prevent triggering business card flip/modal
              >
                <Telegram3DButton />
                <WhatsApp3DButton onClick={onWhatsAppClick} />
              </div>
            </div>

          </div>
        </div>
      </ShiningMovingBorder>
    </div>
  );
};
