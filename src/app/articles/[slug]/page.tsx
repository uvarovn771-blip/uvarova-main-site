
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AdBanner } from '@/components/ad-banner';

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
  
  const image = PlaceHolderImages.find((p) => p.id === article.image.id);

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: image ? [image.imageUrl] : [],
    },
    alternates: {
      canonical: `/articles/${slug}`,
    },
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
  params: Promise<{ slug:string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const { content: compiledContent } = await compileMDX({
    source: article.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

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

        <AdBanner />

        {image && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
            <Image
              src={image.imageUrl}
              alt={`${article.title} — ${image.description}`}
              fill
              className="object-cover"
              priority
              data-ai-hint={image.imageHint}
            />
          </div>
        )}

        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert">
          {compiledContent}
        </div>
      </article>
    </>
  );
}
