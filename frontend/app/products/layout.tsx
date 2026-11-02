import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'All Products & Collections — Designer Sarees, Kurtis & Lehengas',
  description: 'Explore the complete collection of designer sarees, Navratri lehengas, festive mirror-work kurtis, and royal Indian ethnic wear at ARGHYA (Arghyya Collections).',
  alternates: {
    canonical: `${BASE_URL}/products`,
  },
  openGraph: {
    title: 'All Products | ARGHYA (Arghyya Collections)',
    description: 'Shop affordable luxury Indian couture, handcrafted designer sarees, and festive wear with Cash on Delivery across India.',
    url: `${BASE_URL}/products`,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
