'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { articles, categories } from '@/lib/data';
import type { ArticleCategory } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'All'>('All');

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((article) => article.category === activeCategory);

  const allCategories: (ArticleCategory | 'All')[] = ['All', ...categories];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Explore Our Knowledge Hub
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Find insights, tips, and exercises to support every stage of speech development.
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

      <motion.div
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredArticles.map((article) => (
            <motion.div
              key={article.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
