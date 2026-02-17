
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article-card';
import type { Article } from '@/lib/types';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type HomeClientProps = {
  articles: Article[];
  heroImage: ImagePlaceholder | undefined;
};

export default function HomeClient({ articles, heroImage }: HomeClientProps) {
  const [showMore, setShowMore] = useState(false);

  const featuredArticles = articles.slice(0, 15);
  const newArticles = featuredArticles.slice(0, 3);
  const popularArticles = featuredArticles.slice(3, 9);
  const beginnerArticles = featuredArticles.slice(9, 15);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <section className="container mx-auto px-4 pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Направляем первые слова вашего ребенка
            </h1>
            <p className="text-lg text-muted-foreground">
              Изучите экспертные статьи, практические упражнения и душевные советы, чтобы поддержать речевое путешествие вашего ребенка.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button asChild className="h-auto rounded-xl px-8 py-4 text-lg font-bold md:px-10 md:py-5 md:text-xl">
                <Link href="/articles">Все статьи</Link>
              </Button>
              <Button asChild variant="secondary" className="h-auto rounded-xl px-8 py-4 text-lg font-bold md:px-10 md:py-5 md:text-xl">
                <Link href="/games">Онлайн игры</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto flex flex-col gap-16 px-4">
        <div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Новое
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Самые свежие материалы и актуальные советы от нашего эксперта.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Популярное
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Статьи, которые помогли уже тысячам родителей.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {popularArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>

        {showMore && (
           <div>
              <div className="flex flex-col items-start gap-2">
                <h2 className="font-headline text-3xl font-bold tracking-tight">
                  Для начинающих
                </h2>
                <p className="max-w-xl text-muted-foreground">
                  Все, что нужно знать, если вы только начинаете свой путь.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {beginnerArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
           </div>
        )}

        {!showMore && beginnerArticles.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Button onClick={() => setShowMore(true)} size="lg">
              Показать еще
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
