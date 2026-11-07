import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'All Jewellery Collections — 925 Pure Silver & Anti-Tarnish Jewellery',
  description: 'Explore the complete collection of handcrafted 925 sterling silver bracelets, necklaces, anklets, waterproof anti-tarnish earrings, and Indian fine jewellery at ARGHYA.',
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
  openGraph: {
    title: 'All Jewellery Collections | ARGHYA Fine Jewellery',
    description: 'Discover handcrafted Indian fine jewellery — certified 925 sterling silver, waterproof anti-tarnish pieces, and American Diamond sets with Free Shipping Pan India & Cash on Delivery.',
    url: `${BASE_URL}/products`,
    siteName: 'ARGHYA Fine Jewellery',
    images: [
      {
        url: `${BASE_URL}/images/arghya_logo_card.png`,
        width: 1200,
        height: 630,
        alt: 'ARGHYA Fine Jewellery Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Jewellery Collections | ARGHYA Fine Jewellery',
    description: 'Discover handcrafted Indian fine jewellery — certified 925 sterling silver, waterproof anti-tarnish pieces, and American Diamond sets with Free Shipping Pan India & Cash on Delivery.',
    images: [`${BASE_URL}/images/arghya_logo_card.png`],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
