import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'About Us — A Feeling Called ARGHYA | Fine Jewellery',
  description: 'At ARGHYA, we believe jewellery is more than an accessory. Explore our story of timeless 925 sterling silver, anti-tarnish fine jewellery, and everyday luxury designed for you.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About ARGHYA — Slay Everyday',
    description: 'Luxury should feel personal, style should feel effortless, and beauty should never come with an unreasonable price tag.',
    url: `${BASE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
