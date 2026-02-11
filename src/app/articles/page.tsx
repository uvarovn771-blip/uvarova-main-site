import { articles, categories } from '@/lib/data';
import ArticlesClientPage from './client';

export default function ArticlesPage() {
  return <ArticlesClientPage articles={articles} categories={categories} />;
}
