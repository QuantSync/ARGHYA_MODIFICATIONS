import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export const JsonLdStructuredData: React.FC = () => {
  // 1. Organization & Brand Schema with alternateName mapping for "arghya", "arghyya", "arghyya.com", "arghya.co"
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['JewelryStore', 'Brand', 'Organization'],
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
      'Arghya Jewellery',
      'Arghyya Fine Jewellery'
    ],
    url: BASE_URL,
    logo: `${BASE_URL}/images/arghya_logo_card.png`,
    image: `${BASE_URL}/images/arghya_logo_card.png`,
    description: 'ARGHYA (officially at arghyya.com, also widely searched as Arghya, Arghyya, Arghya, or arghya.co) is India’s signature contemporary fine jewellery house specializing in authenticated 925 sterling silver, waterproof anti-tarnish designer jewellery, American Diamond sets, and handcrafted oxidised silver earrings.',
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
    alternateName: ['Arghya Modifications', 'Arghyya', 'arghyya.com', 'Arghya', 'ARGHYA Fine Jewellery'],
    description: 'Official online home of ARGHYA & Arghyya (arghyya.com) — Fine Jewellery & 925 Pure Silver Collection',
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
          text: 'ARGHYA (hosted at arghyya.com, also widely searched as Arghyya or Arghya) is India’s premier fine jewellery atelier specializing in certified 925 sterling silver, waterproof anti-tarnish everyday jewelry, American Diamond sets, and handcrafted oxidised silver earrings.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I purchase authentic Arghya or Arghyya jewellery?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Authentic ARGHYA fine jewellery is exclusively available at our official online flagship store at arghyya.com (www.arghyya.com) with guaranteed 925 silver purity hallmarks and verified Cash on Delivery across India.'
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
