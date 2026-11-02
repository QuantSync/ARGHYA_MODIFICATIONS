import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'About Us — The Story of ARGHYA & Arghyya Atelier',
  description: 'Learn about ARGHYA (also known as Arghyya Collections) — our heritage of Indian craftsmanship, modern atelier design, and mission to deliver affordable luxury couture across India.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    title: 'About ARGHYA (Arghyya Collections) Atelier',
    description: 'Heritage handlooms, modern silhouettes, and direct-to-consumer luxury Indian couture.',
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
