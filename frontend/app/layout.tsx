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
    default: 'ARGHYA (Arghyya) — Official Store | Luxury Couture & Designer Sarees',
    template: '%s | ARGHYA (Arghyya)',
  },
  description: 'Official online boutique of ARGHYA (also searched as Arghyya, arghyya.com, arghya.co, or Arghya Collections). Discover affordable premium designer sarees, royal bridal lehengas, Navratri chaniya choli sets, and festive kurtis with verified Cash on Delivery across India.',
  keywords: [
    'arghya',
    'arghyya',
    'arghyya.com',
    'www.arghyya.com',
    'arghya collections',
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
    'arghya fashion',
    'arghyya fashion',
    'arghya clothing',
    'arghyya clothing',
    'arghya saree',
    'arghyya saree',
    'arghya chaniya choli',
    'arghyya chaniya choli',
    'designer sarees india',
    'affordable luxury couture',
    'navratri collection',
    'slay everyday arghya',
    'festive kurtis online',
    'cash on delivery sarees'
  ],
  applicationName: 'ARGHYA',
  authors: [{ name: 'ARGHYA (Arghyya)', url: SITE_URL }],
  creator: 'ARGHYA',
  publisher: 'ARGHYA (Arghyya)',
  category: 'Fashion & Apparel',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ARGHYA | Arghyya Collections — Official Luxury Couture & Designer Sarees',
    description: 'ARGHYA (also searched as Arghyya). Discover handcrafted designer sarees, festive lehengas, and ethnic wear with Cash on Delivery across India.',
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
    title: 'ARGHYA | Arghyya Collections — Official Luxury Couture',
    description: 'Official online boutique for ARGHYA (Arghyya). Slay Everyday with affordable luxury Indian ethnic fashion.',
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
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <head>
        <JsonLdStructuredData />
      </head>
      <body className="min-h-screen flex flex-col transition-colors duration-300">
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
