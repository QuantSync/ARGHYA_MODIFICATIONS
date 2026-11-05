import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.arghyya.com';

export const metadata: Metadata = {
  title: 'Privacy Policy | ARGHYA',
  description: 'Official Privacy Policy of ARGHYA explaining how we collect, use, and protect your personal and payment data in compliance with applicable standards.',
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy | ARGHYA Fine Jewelry',
    description: 'Learn about our data collection, security measures, Razorpay payment processing, and your privacy rights.',
    url: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

