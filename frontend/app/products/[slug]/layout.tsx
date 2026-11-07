import React from 'react';
import type { Metadata } from 'next';
import { getCatalogProduct } from '../../../lib/productsCatalog';
import { getProductReviews } from '../../../lib/productReviews';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getCatalogProduct(params.slug);

  if (!product) {
    return {
      title: 'ARGHYA — Fine Jewellery | 925 Pure Silver & Anti-Tarnish Collection',
      description: 'Discover handcrafted Indian fine jewellery, authenticated 925 sterling silver, and waterproof anti-tarnish designer pieces at ARGHYA. Free Shipping Pan India & Cash on Delivery.',
      openGraph: {
        title: 'ARGHYA — Fine Jewellery | 925 Pure Silver & Anti-Tarnish Collection',
        description: 'Discover handcrafted Indian fine jewellery, authenticated 925 sterling silver, and waterproof anti-tarnish designer pieces at ARGHYA. Free Shipping Pan India & Cash on Delivery.',
        url: BASE_URL,
        siteName: 'ARGHYA Fine Jewellery',
        images: [
          {
            url: `${BASE_URL}/images/arghya_logo_card.png`,
            width: 1200,
            height: 630,
            alt: 'ARGHYA Fine Jewellery',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'ARGHYA — Fine Jewellery | 925 Pure Silver & Anti-Tarnish',
        description: 'Discover handcrafted Indian fine jewellery, authenticated 925 sterling silver, and waterproof anti-tarnish designer pieces at ARGHYA. Free Shipping Pan India & Cash on Delivery.',
        images: [`${BASE_URL}/images/arghya_logo_card.png`],
      },
    };
  }

  const title = `${product.name} — ARGHYA Fine Jewellery`;
  const description = `Shop ${product.name} (₹${product.price}) online at ARGHYA. Handcrafted luxury Indian jewellery in ${product.fabric || '925 sterling silver / anti-tarnish'}. Free Shipping Pan India & Cash on Delivery available.`;
  const canonicalUrl = `${BASE_URL}/products/${params.slug}`;
  const imageUrl = product.images[0]?.startsWith('http')
    ? product.images[0]
    : `${BASE_URL}${product.images[0] || '/images/arghya_logo_card.png'}`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `buy ${product.name.toLowerCase()}`,
      'arghya',
      'arghyya',
      'arghyya.com',
      'arghya fine jewellery',
      'indian fine jewellery',
      '925 sterling silver',
      'anti tarnish jewellery',
      product.category.toLowerCase(),
      'buy jewellery online india',
      'cash on delivery jewellery',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | ARGHYA Fine Jewellery`,
      description,
      url: canonicalUrl,
      siteName: 'ARGHYA Fine Jewellery',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: `${product.name} by ARGHYA`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ARGHYA Fine Jewellery`,
      description,
      images: [imageUrl],
    },
  };
}

export default function ProductDetailLayout({
  children,
  params,
}: ProductLayoutProps) {
  const product = getCatalogProduct(params.slug);
  const reviews = getProductReviews(params.slug);

  const productJsonLd = product
    ? {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images.map((img: string) =>
        img.startsWith('http') ? img : `${BASE_URL}${img}`
      ),
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'ARGHYA',
        alternateName: 'Arghyya',
      },
      offers: {
        '@type': 'Offer',
        url: `${BASE_URL}/products/${params.slug}`,
        priceCurrency: 'INR',
        price: product.price,
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'ARGHYA (Arghyya Collections)',
        },
      },
      aggregateRating: reviews
        ? {
          '@type': 'AggregateRating',
          ratingValue: reviews.rating.toString(),
          reviewCount: reviews.totalReviews.toString(),
          bestRating: '5',
          worstRating: '1',
        }
        : undefined,
    }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
