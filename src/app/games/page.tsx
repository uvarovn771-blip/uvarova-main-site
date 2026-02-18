
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Развивающие игры Онлайн',
  description: 'Коллекция увлекательных и полезных онлайн-игр от Натальи Уваровой для развития речи и когнитивных навыков у детей.',
  alternates: {
    canonical: '/games',
  },
};

type Game = {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  isActive: boolean;
};

const gamesList: Game[] = [
  {
    title: 'Кто как говорит?',
    description: 'Простая и веселая игра для самых маленьких. Учим звуки животных вместе!',
    href: '/games/who-says-what',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1080',
    isActive: true,
  },
  {
    title: 'Найди лишнее',
    description: 'Развиваем логику и внимание, находя предмет, который не подходит к остальным.',
    href: '/games/find-the-odd-one',
    imageUrl: '/FindExtraGame/oddImageCard.jpg',
    isActive: true,
  },
  {
    title: 'Найди пару',
    description: 'Тренируем память и внимание, находя одинаковые картинки.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1599666520205-7ef9d1b85ab9?q=80&w=1080&auto=format&fit=crop',
    isActive: false,
  },
  {
    title: 'Собери историю',
    description: 'Учимся строить последовательности и рассказывать истории по картинкам.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1080&auto=format&fit=crop',
    isActive: false,
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Развивающие игры от Натальи Уваровой
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Игровой подход — ключ к успешному обучению. Наши игры помогают развивать речь, память и мышление в легкой и увлекательной форме.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {gamesList.map((game) =>
          game.isActive ? (
            <Link key={game.title} href={game.href} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{game.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between">
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                  <div className={cn(buttonVariants(), 'mt-4 w-full')}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Играть
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card key={game.title} className={cn('relative flex h-full flex-col overflow-hidden')}>
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
                <span className="text-xl font-bold text-foreground">Скоро будет</span>
              </div>
              <div className="relative h-48 w-full">
                <Image
                  src={game.imageUrl}
                  alt={game.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-sm text-muted-foreground">{game.description}</p>
                <Button disabled className="mt-4 w-full">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Играть
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
