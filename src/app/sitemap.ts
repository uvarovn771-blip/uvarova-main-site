import type { MetadataRoute } from 'next';
import { articles } from '@/lib/data';

const URL = 'https://logoped-blog.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${URL}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${URL}/`,
      lastModified: new Date('2026-02-15'),
      priority: 1.0,
    },
    {
      url: `${URL}/articles`,
      lastModified: new Date('2026-02-15'),
      priority: 0.9,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date('2026-02-15'),
      priority: 0.7,
    },
    {
      url: `${URL}/contacts`,
      lastModified: new Date('2026-02-15'),
      priority: 0.7,
    },
  ];

  return [
    ...staticPages,
    ...articleEntries,
  ];
}
