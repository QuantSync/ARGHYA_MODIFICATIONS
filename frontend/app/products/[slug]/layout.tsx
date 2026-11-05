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
      title: 'Luxury Ethnic Couture & Designer Sarees',
      description: 'Explore affordable luxury couture, designer sarees, and festive wear at ARGHYA (Arghyya Collections).',
    };
  }

  const title = `${product.name} — Luxury Ethnic Couture`;
  const description = `Buy ${product.name} at ₹${product.price} online from ARGHYA (Arghyya Collections). ${product.fabric || 'Premium Fabric'} with ${product.craft_type || 'Artisanal Craft'}. Verified Cash on Delivery & Fast Delivery across India.`;
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
      'arghya',
      'arghyya collections',
      'arghya.co',
      product.category.toLowerCase(),
      'designer ethnic wear online',
      'cash on delivery ethnic wear',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | ARGHYA (Arghyya Collections)`,
      description,
      url: canonicalUrl,
      siteName: 'ARGHYA (Arghyya Collections)',
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
      title: `${product.name} | ARGHYA`,
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
