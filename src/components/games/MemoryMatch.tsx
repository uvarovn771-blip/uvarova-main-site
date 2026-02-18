
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memoryImageAssets, cardBackImage } from '@/lib/memory-assets';
import { Confetti } from '@/components/ui/confetti';

type CardData = {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const levelConfig = [
  { level: 1, pairs: 2, grid: 'grid-cols-2 grid-rows-2' },
  { level: 2, pairs: 3, grid: 'grid-cols-3 grid-rows-2' },
  { level: 3, pairs: 6, grid: 'grid-cols-4 grid-rows-3' },
  { level: 4, pairs: 8, grid: 'grid-cols-4 grid-rows-4' },
  { level: 5, pairs: 10, grid: 'grid-cols-5 grid-rows-4' },
];

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function MemoryMatchGame() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [incorrectShake, setIncorrectShake] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (sound: 'success' | 'error' | 'win') => {
    if (audioRef.current) {
      audioRef.current.src = `/sounds/${sound}.mp3`;
      audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    }
  };

  const setupLevel = (currentLevel: number) => {
    setIsGameWon(false);
    setFlippedCards([]);
    const config = levelConfig.find(l => l.level === currentLevel) || levelConfig[0];
    
    const shuffledAssets = shuffleArray([...memoryImageAssets]);
    const selectedImages = shuffledAssets.slice(0, config.pairs);
    const pairedImages = [...selectedImages, ...selectedImages];
    const shuffledPairedImages = shuffleArray(pairedImages);

    setCards(
      shuffledPairedImages.map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }))
    );
  };
  
  useEffect(() => {
    setupLevel(level);
  }, [level]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        playSound('success');
        setTimeout(() => {
            setCards(prev =>
              prev.map(card =>
                card.id === firstIndex || card.id === secondIndex
                  ? { ...card, isMatched: true }
                  : card
              )
            );
            setFlippedCards([]);
            setIsChecking(false);
        }, 1000);
      } else {
        playSound('error');
        setIncorrectShake([...flippedCards]);
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstIndex || card.id === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
          setIncorrectShake([]);
        }, 1200);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setTimeout(() => {
        playSound('win');
        setIsGameWon(true);
      }, 500);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.includes(index) || cards[index].isMatched) {
      return;
    }
    
    setFlippedCards(prev => [...prev, index]);
    setCards(prev =>
      prev.map(card =>
        card.id === index ? { ...card, isFlipped: true } : card
      )
    );
  };
  
  const handleNextLevel = () => {
    if (level < levelConfig.length) {
      setLevel(l => l + 1);
    } else {
      setLevel(1);
    }
    setIsGameWon(false);
  };

  const handleReset = () => {
    if(level === 1) {
        setupLevel(1);
    } else {
        setLevel(1);
    }
    setIsGameWon(false);
  };
  
  const currentGrid = levelConfig.find(l => l.level === level)?.grid || 'grid-cols-2';

  return (
    <div className="container mx-auto flex min-h-dvh flex-col px-4 py-8">
      <audio ref={audioRef} preload="auto" />
      <Confetti active={isGameWon} />
      <header className="mb-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        <Button asChild variant="outline">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к играм
          </Link>
        </Button>
        <div className="text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tight md:text-4xl">
                Найди пару (Уровень {level})
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">Открой все одинаковые картинки.</p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Начать заново
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center">
        {isGameWon ? (
          <div className="flex animate-in fade-in-50 zoom-in-95 flex-col items-center gap-4 text-center">
            <Star className="h-24 w-24 text-yellow-400" />
            <h2 className="font-headline text-4xl font-bold">Отлично!</h2>
            <p className="text-muted-foreground">Ты прошел {level} уровень.</p>
            <Button size="lg" onClick={handleNextLevel}>
              {level < levelConfig.length ? 'Следующий уровень' : 'Играть снова'}
            </Button>
          </div>
        ) : (
          <div className={cn("grid w-full max-w-4xl gap-2 sm:gap-4", currentGrid)}>
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={cn(
                  "card perspective group cursor-pointer aspect-square",
                  {'flipped': card.isFlipped || card.isMatched},
                  incorrectShake.includes(card.id) && "animate-shake"
                )}
                onClick={() => handleCardClick(card.id)}
              >
                <div className={cn(
                  "card-inner",
                  card.isMatched && "opacity-0 scale-75 transition-all duration-500 pointer-events-none"
                )}>
                  <div className="card-front overflow-hidden rounded-lg border-2 border-primary/20 shadow-md transition-all group-hover:border-primary">
                    <Image src={cardBackImage} alt="Card back" fill className="object-cover" priority sizes="25vw"/>
                  </div>
                  <div className="card-back overflow-hidden rounded-lg bg-card shadow-md">
                     <Image src={card.image} alt="Card front" fill className="object-contain p-2 sm:p-4" sizes="25vw"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
