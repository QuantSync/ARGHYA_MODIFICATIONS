import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arghyya.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Primary static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/sarees`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Active product slugs for complete catalog indexing
  const productSlugs = [
    'rangrez-chaniya-set',
    'the-prism-radiance-fusion-set',
    'the-saffron-aura-fusion-set',
    'lime-green-floral-mirror-work-kurti',
    'neelam-floral-kurti',
    'roshni-floral-kurti',
    'vamika-floral-kurti',
    'olive-tie-shoulder-kurti',
    'pink-tie-shoulder-kurti',
    'plum-tie-shoulder-kurti',
    'royal-embroided-kurti',
    'navratri-rose-print-garbha-skirt',
    'navratri-folk-design-garbha-skirt',
    'navratri-garba-blue-skirt',
    'raasrang-garba-skirt',
    'blue-blossom-floral-printed-kurti',
    'pink-blossom-floral-printed-kurti',
  ];

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
