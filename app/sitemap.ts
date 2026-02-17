import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://example.com/', changeFrequency: 'daily', priority: 1 },
    { url: 'https://example.com/landing', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://example.com/cart', changeFrequency: 'weekly', priority: 0.3 },
    { url: 'https://example.com/faq', changeFrequency: 'monthly', priority: 0.5 }
  ];
}
