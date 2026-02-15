import { articles, categories } from '@/lib/data';
import ArticlesClientPage from './client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Статьи',
  description: 'Найдите идеи, советы и упражнения для поддержки каждого этапа развития речи.',
  alternates: {
    canonical: '/articles',
  },
};

export default function ArticlesPage() {
  return <ArticlesClientPage articles={articles} categories={categories} />;
}
