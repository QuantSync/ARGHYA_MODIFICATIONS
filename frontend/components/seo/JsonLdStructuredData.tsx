import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const JsonLdStructuredData: React.FC = () => {
  // 1. Organization & Brand Schema with alternateName mapping for "arghya", "arghyya", "arghyya.com", "arghya.co"
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['ClothingStore', 'Brand', 'Organization'],
    '@id': `${BASE_URL}/#organization`,
    name: 'ARGHYA',
    alternateName: [
      'Arghya Modifications',
      'Arghyya',
      'arghyya.com',
      'www.arghyya.com',
      'Arghya',
      'Arghyya Collections',
      'arghya.co',
      'arghya.com',
      'Arghya Official',
      'Arghyya Official',
      'Arghya Boutique',
      'Arghyya Boutique',
      'Arghya Fashion',
      'Arghyya Fashion'
    ],
    url: BASE_URL,
    logo: `${BASE_URL}/images/arghya_logo_card.png`,
    image: `${BASE_URL}/images/arghya_logo_card.png`,
    description: 'ARGHYA (officially at arghyya.com, also widely searched as Arghya, Arghyya, Arghya, or arghya.co) is India’s signature contemporary couture house specializing in affordable luxury designer sarees, royal lehengas, Navratri chaniya choli sets, and festive kurtis.',
    slogan: 'Slay Everyday',
    email: 'care.arghya@gmail.com',
    telephone: '+91-8882827148',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash on Delivery, UPI, Credit Card, Debit Card, Net Banking',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'India'
    },
    sameAs: [
      'https://www.arghyya.com',
      'https://arghyya.com',
      'https://linkedin.com/company/arghya-modifications',
      'https://discord.gg/arghya',
      'https://instagram.com/arghyacollections'
    ]
  };

  // 2. WebSite Schema enabling Google Sitelinks Searchbox
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'ARGHYA',
    alternateName: ['Arghya Modifications', 'Arghyya', 'arghyya.com', 'Arghya'],
    description: 'Official online home of ARGHYA & Arghyya (arghyya.com) — Luxury Indian Couture & Designer Sarees',
    publisher: {
      '@id': `${BASE_URL}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/products?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // 3. FAQPage Schema for Google Search Rich Snippet Accordions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is ARGHYA and is it also known as Arghyya or arghyya.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ARGHYA (hosted at arghyya.com, also widely searched as Arghyya or Arghya) is India’s premier luxury fashion atelier specializing in affordable premium designer sarees, festive kurtis, Navratri chaniya cholis, and royal ethnic wear.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I purchase authentic Arghya or Arghyya outfits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic ARGHYA couture is exclusively available at our official online flagship store at arghyya.com (www.arghyya.com) with guaranteed quality and verified Cash on Delivery across India.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Arghya / Arghyya deliver across India with Cash on Delivery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! ARGHYA provides express doorstep delivery with Cash on Delivery (COD) and fast shipping to all pin codes across India via arghyya.com.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
};
