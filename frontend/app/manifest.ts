import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARGHYA | Fine Jewellery',
    short_name: 'Arghya',
    description: 'ARGHYA (also searched as Arghyya / Arghya) — Authenticated 925 Sterling Silver & Waterproof Anti-Tarnish Indian Fine Jewellery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#120304',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/images/arghya_logo_card.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/arghya_logo_card.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
