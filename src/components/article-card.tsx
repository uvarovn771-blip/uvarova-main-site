import Link from 'next/link';
import Image from 'next/image';

import type { Article } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const image = PlaceHolderImages.find((p) => p.id === article.image.id);

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardHeader>
          <Badge variant="secondary" className="mb-2 w-fit">
            {article.category}
          </Badge>
          <CardTitle className="line-clamp-2 text-lg font-bold">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {article.description}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary">
            Читать далее <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
