import React from 'react';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing orders, payments, Cash on Delivery, and website usage at ARGHYA (Arghyya Collections).',
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
