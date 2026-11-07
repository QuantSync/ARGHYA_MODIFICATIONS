import './globals.css';
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { PageSlideTransition } from '../components/PageSlideTransition';
import { JsonLdStructuredData } from '../components/seo/JsonLdStructuredData';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const viewport: Viewport = {
  themeColor: '#120304',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ARGHYA (Arghyya) — Fine Jewellery | 925 Pure Silver & Anti-Tarnish Collection',
    template: '%s | ARGHYA (Arghyya)',
  },
  description: 'Official online boutique of ARGHYA (also searched as Arghyya, arghyya.com, arghya.co, or Arghya). Discover handcrafted Indian fine jewellery — authenticated 925 sterling silver bracelets, necklaces, anklets, and waterproof anti-tarnish designer jewellery with free Pan-India shipping and verified Cash on Delivery.',
  keywords: [
    'arghya',
    'arghyya',
    'arghyya.com',
    'www.arghyya.com',
    'arghya',
    'arghyya collections',
    'arghya.co',
    'arghya.com',
    'arghya official',
    'arghyya official',
    'arghya official website',
    'arghyya official website',
    'arghya store',
    'arghyya store',
    'arghya brand',
    'arghyya brand',
    'arghya boutique',
    'arghyya boutique',
    'arghya jewellery',
    'arghyya fine jewellery',
    '925 pure silver',
    '925 sterling silver',
    'anti tarnish jewellery',
    'indian fine jewellery',
    'silver bracelets',
    'silver necklaces',
    'silver anklets',
    'american diamond necklace set',
    'oxidised silver earrings',
    'oxidised jhumkis',
    'modern pendants',
    'everyday fine jewellery',
    'waterproof jewellery',
    'hypoallergenic jewellery',
    'free shipping jewellery',
    'cash on delivery jewellery'
  ],
  applicationName: 'ARGHYA',
  authors: [{ name: 'ARGHYA (Arghyya)', url: SITE_URL }],
  creator: 'ARGHYA',
  publisher: 'ARGHYA (Arghyya)',
  category: 'Jewellery & Accessories',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ARGHYA | Arghyya Collections — Fine Jewellery & 925 Pure Silver',
    description: 'Handcrafted 925 sterling silver & waterproof anti-tarnish Indian fine jewellery. Slay Everyday with affordable luxury, certified purity, and free shipping across India.',
    url: SITE_URL,
    siteName: 'ARGHYA (Arghyya Collections)',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/arghya_logo_card.png',
        width: 1200,
        height: 630,
        alt: 'ARGHYA (Arghyya Collections) Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARGHYA | Arghyya Collections — Fine Jewellery & 925 Pure Silver',
    description: 'Official online boutique for ARGHYA fine jewellery. Handcrafted 925 sterling silver & waterproof anti-tarnish designer collections with Cash on Delivery across India.',
    images: ['/images/arghya_logo_card.png'],
    creator: '@arghyacollections',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLdStructuredData />
      </head>
      <body className="min-h-screen flex flex-col transition-colors duration-300 bg-white text-neutral-900">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 overflow-x-hidden">
            <PageSlideTransition>{children}</PageSlideTransition>
          </main>
          <Footer />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
