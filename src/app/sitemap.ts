
import type { MetadataRoute } from 'next';
import { articles } from '@/lib/data';

export const dynamic = 'force-static';

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
      lastModified: new Date('2026-02-20'),
      priority: 1.0,
    },
    {
      url: `${URL}/articles`,
      lastModified: new Date('2026-02-20'),
      priority: 0.9,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date('2026-02-20'),
      priority: 0.7,
    },
    {
      url: `${URL}/contacts`,
      lastModified: new Date('2026-02-20'),
      priority: 0.7,
    },
    {
      url: `${URL}/games`,
      lastModified: new Date('2026-02-20'),
      priority: 0.9,
    },
    {
      url: `${URL}/games/who-says-what`,
      lastModified: new Date('2026-02-20'),
      priority: 0.8,
    },
    {
      url: `${URL}/games/find-the-odd-one`,
      lastModified: new Date('2026-02-20'),
      priority: 0.8,
    },
    {
      url: `${URL}/games/memory-match`,
      lastModified: new Date('2026-02-20'),
      priority: 0.8,
    },
    {
      url: `${URL}/games/make-story`,
      lastModified: new Date('2026-02-20'),
      priority: 0.8,
    },
    {
      url: `${URL}/privacy`,
      lastModified: new Date('2026-02-20'),
      priority: 0.3,
    },
  ];

  const filteredArticles = articleEntries.filter(
    (article, index, self) =>
      index === self.findIndex((a) => a.url === article.url)
  );
  
  return [
    ...staticPages,
    ...filteredArticles,
  ];
}
