'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
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
  { level: 1, pairs: 2, grid: 'grid-cols-2' },
  { level: 2, pairs: 3, grid: 'grid-cols-3' },
  { level: 3, pairs: 6, grid: 'grid-cols-4' },
  { level: 4, pairs: 8, grid: 'grid-cols-4' },
  { level: 5, pairs: 10, grid: 'grid-cols-5' }
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
      audioRef.current.play().catch(e => console.error("Audio error:", e));
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

  // Логика проверки совпадения
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
        }, 600); // Ускорил, чтобы не тупило
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
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // Автоматический переход на следующий уровень
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
      playSound('win');

      const timer = setTimeout(() => {
        if (level < levelConfig.length) {
          setLevel(prev => prev + 1);
        } else {
          // Если прошли всё, просто мешаем заново на макс уровне
          setupLevel(level);
        }
      }, 3000); // 3 секунды любуемся конфетти и переходим

      return () => clearTimeout(timer);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.includes(index) || cards[index].isMatched || cards[index].isFlipped) {
      return;
    }
    
    setFlippedCards(prev => [...prev, index]);
    setCards(prev =>
      prev.map(card =>
        card.id === index ? { ...card, isFlipped: true } : card
      )
    );
  };
  
  const handleReset = () => {
    setLevel(1);
    setupLevel(1);
  };
  
  const currentGrid = levelConfig.find(l => l.level === level)?.grid || 'grid-cols-2';

  return (
    <div className="container mx-auto flex min-h-dvh flex-col px-4 py-8">
      <audio ref={audioRef} preload="auto" />
      <Confetti active={isGameWon} />
      
      <header className="mb-8 flex items-center justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href="/games">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Link>
        </Button>
        <div className="text-center">
            <h1 className="text-xl font-bold">Уровень {level}</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center">
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
                card.isMatched && "opacity-0 scale-75 transition-all duration-700 pointer-events-none"
              )}>
                <div className="card-front overflow-hidden rounded-xl border-4 border-white shadow-xl">
                  <Image src={cardBackImage} alt="back" fill className="object-cover" priority />
                </div>
                <div className="card-back overflow-hidden rounded-xl bg-white shadow-xl relative w-full h-full">
                  <Image 
                  src={card.image} 
                  alt="front" 
                  fill 
                  className="object-cover" // Вот это растянет картинку на всю площадь
                  sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}