
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
    id: 0,
    items: [
      { id: 'a1', img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'a2', img: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'a3', img: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&w=500', isCorrect: false, type: 'animal' },
      { id: 'e1', img: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&w=500', isCorrect: true, type: 'car' }
    ]
  },
  {
    id: 1,
    items: [
      { id: '1_1', img: '/FindExtraGame/1_1.jpg', isCorrect: false, type: 'animal1' },
      { id: '1_2', img: '/FindExtraGame/1_2.jpg', isCorrect: false, type: 'animal1' },
      { id: '1_3', img: '/FindExtraGame/1_3.jpg', isCorrect: false, type: 'animal1' },
      { id: '1_4', img: '/FindExtraGame/1_4.jpg', isCorrect: true, type: 'car1' }
    ]
  },
  {
    id: 2,
    items: [
      { id: '2_1', img: '/FindExtraGame/2_1.jpg', isCorrect: false, type: 'animal2' },
      { id: '2_2', img: '/FindExtraGame/2_2.jpg', isCorrect: false, type: 'animal2' },
      { id: '2_3', img: '/FindExtraGame/2_3.jpg', isCorrect: false, type: 'animal2' },
      { id: '2_4', img: '/FindExtraGame/2_4.jpg', isCorrect: true, type: 'car2' }
    ]
  },
  {
    id: 3,
    items: [
      { id: '3_1', img: '/FindExtraGame/3_1.jpg', isCorrect: false, type: 'fruit' },
      { id: '3_2', img: '/FindExtraGame/3_2.jpg', isCorrect: false, type: 'fruit' },
      { id: '3_3', img: '/FindExtraGame/3_3.jpg', isCorrect: false, type: 'fruit' },
      { id: '3_4', img: '/FindExtraGame/3_4.jpg', isCorrect: true, type: 'furniture' }
    ]
  },
  {
    id: 4,
    items: [
      { id: '4_1', img: '/FindExtraGame/4_1.jpg', isCorrect: false, type: 'bird' },
      { id: '4_2', img: '/FindExtraGame/4_2.jpg', isCorrect: false, type: 'bird' },
      { id: '4_3', img: '/FindExtraGame/4_3.jpg', isCorrect: false, type: 'bird' },
      { id: '4_4', img: '/FindExtraGame/4_4.jpg', isCorrect: true, type: 'planet' }
    ]
  },
  {
    id: 5,
    items: [
      { id: '5_1', img: '/FindExtraGame/5_1.jpg', isCorrect: false, type: 'tool' },
      { id: '5_2', img: '/FindExtraGame/5_2.jpg', isCorrect: false, type: 'tool' },
      { id: '5_3', img: '/FindExtraGame/5_3.jpg', isCorrect: false, type: 'tool' },
      { id: '5_4', img: '/FindExtraGame/5_4.jpg', isCorrect: true, type: 'flower' }
    ]
  },
  {
    id: 6,
    items: [
      { id: '6_1', img: '/FindExtraGame/6_1.jpg', isCorrect: false, type: 'clothing' },
      { id: '6_2', img: '/FindExtraGame/6_2.jpg', isCorrect: false, type: 'clothing' },
      { id: '6_3', img: '/FindExtraGame/6_3.jpg', isCorrect: false, type: 'clothing' },
      { id: '6_4', img: '/FindExtraGame/6_4.jpg', isCorrect: true, type: 'food' }
    ]
  },
  {
    id: 7,
    items: [
      { id: '7_1', img: '/FindExtraGame/7_1.jpg', isCorrect: false, type: 'ocean' },
      { id: '7_2', img: '/FindExtraGame/7_2.jpg', isCorrect: false, type: 'ocean' },
      { id: '7_3', img: '/FindExtraGame/7_3.jpg', isCorrect: false, type: 'ocean' },
      { id: '7_4', img: '/FindExtraGame/7_4.jpg', isCorrect: true, type: 'desert' }
    ]
  },
  {
    id: 8,
    items: [
      { id: '8_1', img: '/FindExtraGame/8_1.jpg', isCorrect: false, type: 'instrument' },
      { id: '8_2', img: '/FindExtraGame/8_2.jpg', isCorrect: false, type: 'instrument' },
      { id: '8_3', img: '/FindExtraGame/8_3.jpg', isCorrect: false, type: 'instrument' },
      { id: '8_4', img: '/FindExtraGame/8_4.jpg', isCorrect: true, type: 'sport' }
    ]
  },
  {
    id: 9,
    items: [
      { id: '9_1', img: '/FindExtraGame/9_1.jpg', isCorrect: false, type: 'space' },
      { id: '9_2', img: '/FindExtraGame/9_2.jpg', isCorrect: false, type: 'space' },
      { id: '9_3', img: '/FindExtraGame/9_3.jpg', isCorrect: false, type: 'space' },
      { id: '9_4', img: '/FindExtraGame/9_4.jpg', isCorrect: true, type: 'earth' }
    ]
  },
  {
    id: 10,
    items: [
      { id: '10_1', img: '/FindExtraGame/10_1.jpg', isCorrect: false, type: 'vegetable' },
      { id: '10_2', img: '/FindExtraGame/10_2.jpg', isCorrect: false, type: 'vegetable' },
      { id: '10_3', img: '/FindExtraGame/10_3.jpg', isCorrect: false, type: 'vegetable' },
      { id: '10_4', img: '/FindExtraGame/10_4.jpg', isCorrect: true, type: 'sweet' }
    ]
  },
  {
    id: 11,
    items: [
      { id: '11_1', img: '/FindExtraGame/11_1.jpg', isCorrect: false, type: 'insect' },
      { id: '11_2', img: '/FindExtraGame/11_2.jpg', isCorrect: false, type: 'insect' },
      { id: '11_3', img: '/FindExtraGame/11_3.jpg', isCorrect: false, type: 'insect' },
      { id: '11_4', img: '/FindExtraGame/11_4.jpg', isCorrect: true, type: 'mammal' }
    ]
  },
  {
    id: 12,
    items: [
      { id: '12_1', img: '/FindExtraGame/12_1.jpg', isCorrect: false, type: 'weather' },
      { id: '12_2', img: '/FindExtraGame/12_2.jpg', isCorrect: false, type: 'weather' },
      { id: '12_3', img: '/FindExtraGame/12_3.jpg', isCorrect: false, type: 'weather' },
      { id: '12_4', img: '/FindExtraGame/12_4.jpg', isCorrect: true, type: 'season' }
    ]
  },
  {
    id: 13,
    items: [
      { id: '13_1', img: '/FindExtraGame/13_1.jpg', isCorrect: false, type: 'toy' },
      { id: '13_2', img: '/FindExtraGame/13_2.jpg', isCorrect: false, type: 'toy' },
      { id: '13_3', img: '/FindExtraGame/13_3.jpg', isCorrect: false, type: 'toy' },
      { id: '13_4', img: '/FindExtraGame/13_4.jpg', isCorrect: true, type: 'school' }
    ]
  },
  {
    id: 14,
    items: [
      { id: '14_1', img: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=500', isCorrect: false, type: 'food11' },
      { id: '14_2', img: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&w=500', isCorrect: false, type: 'food11' },
      { id: '14_3', img: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&w=500', isCorrect: false, type: 'food11' },
      { id: '14_4', img: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&w=500', isCorrect: true, type: 'fruit11' }
    ]
  },
  {
    id: 15,
    items: [
      { id: '15_1', img: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&w=500', isCorrect: false, type: 'drink1' },
      { id: '15_2', img: 'https://images.pexels.com/photos/414645/pexels-photo-414645.jpeg?auto=compress&w=500', isCorrect: false, type: 'drink1' },
      { id: '15_3', img: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&w=500', isCorrect: false, type: 'drink1' },
      { id: '15_4', img: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&w=500', isCorrect: true, type: 'accessory1' }
    ]
  },
  {
    id: 16,
    items: [
      { id: '16_1', img: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport11' },
      { id: '16_2', img: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport11' },
      { id: '16_3', img: 'https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&w=500', isCorrect: false, type: 'transport11' },
      { id: '16_4', img: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&w=500', isCorrect: true, type: 'air_transport11' }
    ]
  },
  {
    id: 17,
    items: [
      { id: '17_1', img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=500', isCorrect: false, type: 'building' },
      { id: '17_2', img: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&w=500', isCorrect: false, type: 'building' },
      { id: '17_3', img: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&w=500', isCorrect: false, type: 'building' },
      { id: '17_4', img: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&w=500', isCorrect: true, type: 'nature' }
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
