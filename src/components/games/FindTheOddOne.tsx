
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Data structure for game levels
const gameLevels = [
  {
    id: 1,
    items: [
      { id: 'a1', img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'a2', img: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'a3', img: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'e1', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&w=500', isCorrect: true, type: 'car' }
    ]
  },
  {
    id: 2,
    items: [
      { id: 'f1', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&w=500', isCorrect: false, type: 'fruit' },
      { id: 'f2', img: 'https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=compress&w=500', isCorrect: false, type: 'fruit' },
      { id: 'b1', img: 'https://images.pexels.com/photos/1242764/pexels-photo-1242764.jpeg?auto=compress&w=500', isCorrect: true, type: 'ball' },
      { id: 'f3', img: 'https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&w=500', isCorrect: false, type: 'fruit' }
    ]
  },
  {
    id: 3,
    items: [
      { id: 't1', img: 'https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport' },
      { id: 't2', img: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport' },
      { id: 'v1', img: 'https://images.pexels.com/photos/2765557/pexels-photo-2765557.jpeg?auto=compress&w=500', isCorrect: true, type: 'vegetable' },
      { id: 't3', img: 'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport' }
    ]
  }
];

type GameItem = {
  id: string;
  img: string;
  isCorrect: boolean;
  type: string;
};

type Feedback = {
  itemId: string;
  status: 'correct' | 'incorrect';
} | null;

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function FindTheOddOneGame() {
  const [currentItems, setCurrentItems] = useState<GameItem[]>([]);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (src: string) => {
    if (audioRef.current) {
      // Assuming sound files are in public folder
      audioRef.current.src = src;
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
  };

  const startNewRound = () => {
    setFeedback(null);
    setIsAnimating(false);
    const randomLevel = gameLevels[Math.floor(Math.random() * gameLevels.length)];
    setCurrentItems(shuffleArray(randomLevel.items));
    playSound('/FindExtraGame/FindExtraGameSound.m4a');
  };

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemClick = (item: GameItem) => {
    if (isAnimating) return;

    if (item.isCorrect) {
      setIsAnimating(true);
      setFeedback({ itemId: item.id, status: 'correct' });
      playSound('/sounds/success.mp3'); 
      setTimeout(() => {
        startNewRound();
      }, 2000);
    } else {
      setIsAnimating(true);
      setFeedback({ itemId: item.id, status: 'incorrect' });
      playSound('/sounds/error.mp3');
      setTimeout(() => {
        setFeedback(null);
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto flex h-full min-h-dvh flex-col px-4 py-8">
      <audio ref={audioRef} preload="auto" />
      <header className="mb-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        <Button asChild variant="outline">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к играм
          </Link>
        </Button>
        <div className="text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tight md:text-4xl">
                Найди лишнее
            </h1>
            <p className="flex items-center justify-center text-sm text-muted-foreground md:text-base">
                <Volume2 className="mr-2 h-5 w-5" />
                <span>Найди картинку, которая не подходит к остальным.</span>
            </p>
        </div>
        <Button variant="outline" onClick={startNewRound}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Следующий
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="grid h-full w-full max-w-4xl grid-cols-2 grid-rows-2 gap-4 md:gap-8">
          {currentItems.map((item) => (
            <div key={item.id} className="relative aspect-square">
              <button
                onClick={() => handleItemClick(item)}
                disabled={isAnimating}
                className={cn(
                  'group h-full w-full select-none overflow-hidden rounded-2xl border-4 border-transparent transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary',
                  'active:scale-95',
                  feedback?.itemId === item.id && feedback.status === 'incorrect' && 'animate-shake border-destructive',
                  feedback?.itemId === item.id && feedback.status === 'correct' && 'border-green-500'
                )}
              >
                <Card className="h-full w-full overflow-hidden">
                  <CardContent className="relative h-full w-full p-0">
                    <Image
                      src={item.img}
                      alt="Game item"
                      fill
                      sizes="(max-width: 768px) 50vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                     {feedback?.itemId === item.id && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                         {feedback.status === 'correct' && <CheckCircle2 className="h-24 w-24 text-green-400" />}
                         {feedback.status === 'incorrect' && <XCircle className="h-24 w-24 text-red-400" />}
                       </div>
                     )}
                  </CardContent>
                </Card>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
