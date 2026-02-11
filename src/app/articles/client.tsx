'use client';

import { useState } from 'react';

import type { Article, ArticleCategory } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ArticlesClientPageProps = {
  articles: Article[];
  categories: ArticleCategory[];
};

export default function ArticlesClientPage({ articles, categories }: ArticlesClientPageProps) {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'Все'>('Все');

  const filteredArticles = activeCategory === 'Все'
    ? articles
    : articles.filter((article) => article.category === activeCategory);

  const allCategories: (ArticleCategory | 'Все')[] = ['Все', ...categories];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Исследуйте нашу базу знаний
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Найдите идеи, советы и упражнения для поддержки каждого этапа развития речи.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {allCategories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'rounded-full',
              activeCategory === category && 'bg-primary hover:bg-primary/90'
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
