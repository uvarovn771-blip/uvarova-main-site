
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === article.image.id);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: image?.imageUrl || '',
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpeechAce',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logo.png',
      },
    },
    datePublished: article.publishedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="font-headline text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-muted-foreground">
            Автор: {article.author}, {formatDate(article.publishedAt)}
          </p>
        </header>

        {image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
            <Image
              src={image.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
          {article.content.split('\n\n').map((block, index) => {
            if (block.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="font-headline text-xl font-bold mt-8 mb-4 tracking-tight md:text-2xl"
                >
                  {block.substring(4)}
                </h3>
              );
            }
            if (block.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="font-headline text-2xl font-extrabold mt-12 mb-6 tracking-tighter md:text-3xl"
                >
                  {block.substring(3)}
                </h2>
              );
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').map((item) => item.replace(/^- /, ''));
              return (
                <ul
                  key={index}
                  className="list-disc space-y-3 pl-6 mb-6 text-lg leading-relaxed text-foreground"
                >
                  {items.map((item, i) => (
                    <li key={i} className="pl-2">{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="mb-6 text-lg leading-relaxed text-foreground">
                {block}
              </p>
            );
          })}
        </div>
      </article>
    </>
  );
}
    