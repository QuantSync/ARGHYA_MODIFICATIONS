import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'Shipping, Returns & Privacy Policies',
  description: 'Official store policies of ARGHYA (Arghyya Collections) covering 100% verified Cash on Delivery, all-India shipping, hassle-free returns, and customer data privacy.',
  alternates: {
    canonical: `${BASE_URL}/policy`,
  },
  openGraph: {
    title: 'Customer Policies | ARGHYA (Arghyya Collections)',
    description: 'Learn about our shipping times, return policies, and privacy guarantees.',
    url: `${BASE_URL}/policy`,
  },
};

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
