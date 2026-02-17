
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type Animal = {
  name: string;
  sound: string;
  imageUrl: string;
  soundUrl?: string;
};

const animals: Animal[] = [
  { name: 'Корова', sound: 'Му-у-у!', imageUrl: 'https://images.unsplash.com/photo-1570042225732-3adc135c58a1?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/cow.mp3' },
  { name: 'Собака', sound: 'Гав-гав!', imageUrl: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/dog.mp3' },
  { name: 'Кошка', sound: 'Мяу!', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/cat.mp3' },
  { name: 'Утка', sound: 'Кря-кря!', imageUrl: 'https://images.unsplash.com/photo-1563209250-3d3a3a785253?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/duck.mp3' },
  { name: 'Овца', sound: 'Бе-е-е!', imageUrl: 'https://images.unsplash.com/photo-1511117997523-4a39155357c2?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/sheep.mp3' },
  { name: 'Свинья', sound: 'Хрю-хрю!', imageUrl: 'https://images.unsplash.com/photo-1516467225658-6ce9d2d16ba0?q=80&w=1080', soundUrl: '/games/gameAnimalSounds/pig.mp3' },
];

export default function WhoSaysWhatGame() {
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const [key, setKey] = useState(0);

  const handleAnimalClick = (animal: Animal) => {
    setActiveAnimal(animal);
    
    if (animal.soundUrl) {
      try {
        const audio = new Audio(animal.soundUrl);
        audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  const handleReset = () => {
    setActiveAnimal(null);
    setKey(prevKey => prevKey + 1);
  };
  
  return (
    <div className="container mx-auto flex h-full min-h-[calc(100vh-7rem)] flex-col px-4 py-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <Button asChild variant="outline" className="flex-shrink-0">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к играм
          </Link>
        </Button>
        <div className="text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tight md:text-4xl">
                Кто как говорит?
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">Нажми на животное, чтобы услышать его звук!</p>
        </div>
        <Button variant="outline" onClick={handleReset} className="flex-shrink-0">
          <RefreshCw className="mr-2 h-4 w-4" />
          Начать заново
        </Button>
      </header>

      <div key={key} className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {animals.map((animal) => (
          <button key={animal.name} onClick={() => handleAnimalClick(animal)} className="group relative focus:outline-none">
            <Card className="h-full w-full overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus:ring-4 group-focus:ring-primary">
              <CardContent className="relative h-full w-full p-0">
                <Image
                  src={animal.imageUrl}
                  alt={animal.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className={cn(
                    'object-cover transition-transform duration-500',
                    activeAnimal?.name === animal.name && 'scale-110'
                  )}
                />
                {activeAnimal?.name === animal.name && (
                  <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-black/40 duration-500">
                    <div className="rounded-full bg-background px-6 py-3 text-2xl font-bold text-primary shadow-lg md:text-4xl">
                      {animal.sound}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}
