import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { articles } from '@/lib/data';
import { ArticleCard } from '@/components/article-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const featuredArticles = articles.slice(0, 3);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');

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
            <Button asChild size="lg" className="mt-4">
              <Link href="/articles">Изучить статьи</Link>
            </Button>
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

      <section className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-2">
          <h2 className="font-headline text-3xl font-bold tracking-tight">
            Избранные статьи
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Отобрано для вас. Погрузитесь в наши самые популярные статьи о развитии речи и воспитании детей.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
