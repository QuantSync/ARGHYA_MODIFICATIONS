'use client';

import React from 'react';
import { BulgeWidget } from './BulgeWidget';
import { CardShiningBorder } from './animations/CardShiningBorder';
import { AnimatedShieldSword } from './animations/AnimatedShieldSword';
import { AnimatedClock } from './animations/AnimatedClock';
import { AnimatedTruck } from './animations/AnimatedTruck';
import { ScrollReveal } from './animations/ScrollReveal';

const pillars = [
  {
    icon: <AnimatedClock />,
    title: '100% Handcrafted Authenticity',
    desc: 'Every 925 silver & anti-tarnish piece is handcrafted with certified purity by master artisans.',
  },
  {
    icon: <AnimatedTruck />,
    title: 'Pan India Delivery',
    desc: 'Insured Express Shipping across India and all of its territories.',
  },
  {
    icon: <AnimatedShieldSword />,
    title: 'Multi-Gateway Secure Checkout',
    desc: 'Encrypted payments via Razorpay, Stripe, Cashfree, and Paytm.',
  },
];

export const ValuePillarsWidget: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((pillar, idx) => (
        <ScrollReveal key={idx} delay={idx * 0.15} direction="up">
          <BulgeWidget>
            <CardShiningBorder roundedClassName="rounded-2xl">
              <div className="p-8 bg-white dark:bg-stone-900 border border-burgundy-800/10 dark:border-stone-800 text-center space-y-4 shadow-sm dark:shadow-md h-full flex flex-col justify-center">
                {pillar.icon}
                <h3 className="font-serif text-lg font-bold text-burgundy-900 dark:text-amber-200">{pillar.title}</h3>
                <p className="text-xs text-burgundy-800/70 dark:text-stone-400 leading-relaxed">{pillar.desc}</p>
              </div>
            </CardShiningBorder>
          </BulgeWidget>
        </ScrollReveal>
      ))}
    </div>
  );
};
