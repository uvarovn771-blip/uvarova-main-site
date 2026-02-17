'use client';

import { useState, useRef } from 'react';
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
  { name: 'Корова', sound: 'Му-у-у!', imageUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=1000', soundUrl: '/gameAnimalSounds/cow.mp3' },
  { name: 'Собака', sound: 'Гав-гав!', imageUrl: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?q=80&w=1000', soundUrl: '/gameAnimalSounds/dog.mp3' },
  { name: 'Кошка', sound: 'Мяу!', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1080', soundUrl: '/gameAnimalSounds/cat.mp3' },
  { name: 'Утка', sound: 'Кря-кря!', imageUrl: 'https://images.unsplash.com/photo-1459682687441-7761439a709d?q=80&w=1000', soundUrl: '/gameAnimalSounds/duck.mp3' },
  { name: 'Овца', sound: 'Бе-е-е!', imageUrl: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1000', soundUrl: '/gameAnimalSounds/sheep.mp3' },
  { name: 'Свинья', sound: 'Хрю-хрю!', imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1000', soundUrl: '/gameAnimalSounds/pig.mp3' },
  { name: 'Петух', sound: 'Ку-ка-ре-ку!', imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1000', soundUrl: '/gameAnimalSounds/petuh.mp3' },
  { name: 'Лев', sound: 'Р-р-р-а-ар!', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1000', soundUrl: '/gameAnimalSounds/line.mp3' },
  { name: 'Конь', sound: 'И-го-го!', imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1000', soundUrl: '/gameAnimalSounds/horse.mp3' },
  { name: 'Мышь', sound: 'Пи-пи-пи!', imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1000', soundUrl: '/gameAnimalSounds/mouse.mp3' },
  { name: 'Ворона', sound: 'Кар-кар!', imageUrl: '/gameAnimalSounds/crowImage.jpg', soundUrl: '/gameAnimalSounds/vorona.mp3' },
  { name: 'Сова', sound: 'Уху-уху!', imageUrl: '/gameAnimalSounds/owlImage.jpg', soundUrl: '/gameAnimalSounds/owl.mp3' },
  { name: 'Жаба', sound: 'Ква-ква!', imageUrl: '/gameAnimalSounds/frogImage.jpg', soundUrl: '/gameAnimalSounds/frog.mp3' },
];

export default function WhoSaysWhatGame() {
  const [activeAnimal, setActiveAnimal] = useState<Animal | null>(null);
  const [key, setKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAnimalClick = (animal: Animal) => {
    setActiveAnimal(animal);
    
    if (animal.soundUrl && audioRef.current) {
        // Stop any currently playing sound before starting a new one
        if (!audioRef.current.paused) {
            audioRef.current.pause();
        }
        
        audioRef.current.src = animal.soundUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.load(); // Explicitly tell the element to load the new source
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // This error can happen if the audio file path is incorrect or a browser autoplay policy is preventing it.
                console.error("Audio playback failed:", error);
            });
        }
    }
  };

  const handleReset = () => {
    setActiveAnimal(null);
    setKey(prevKey => prevKey + 1);
    if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
  };
  
  return (
    <div className="container mx-auto flex flex-col px-4 py-8">
      <audio ref={audioRef} preload="auto" />
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

      <div key={key} className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {animals.map((animal) => (
          <button key={animal.name} onClick={() => handleAnimalClick(animal)} className="group relative focus:outline-none">
            <Card className="h-full w-full overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus:ring-4 group-focus:ring-primary">
              <CardContent className="relative aspect-[4/3] w-full p-0">
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
