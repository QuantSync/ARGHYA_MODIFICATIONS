import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'Exclusive Handloom Sarees Collection — Coming Soon',
  description: 'Upcoming luxury handcrafted designer sarees collection by ARGHYA (Arghyya Collections). Stay tuned for royal Banarasi, Kanjivaram, and Organza creations.',
  alternates: {
    canonical: `${BASE_URL}/sarees`,
  },
  openGraph: {
    title: 'Designer Sarees Collection | ARGHYA (Arghyya Collections)',
    description: 'Exclusive handloom sarees coming soon to ARGHYA.',
    url: `${BASE_URL}/sarees`,
  },
};

export default function SareesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
