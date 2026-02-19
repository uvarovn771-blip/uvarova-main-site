
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { storyLevels } from '@/lib/make-story-assets';
import type { StoryStep } from '@/lib/make-story-assets';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, GripVertical, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Confetti } from '@/components/ui/confetti';

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function MakeStoryGame() {
  const [level, setLevel] = useState(storyLevels[0]);
  const [sourceItems, setSourceItems] = useState<StoryStep[]>([]);
  const [targetSlots, setTargetSlots] = useState<(StoryStep | null)[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isGameWon, setIsGameWon] = useState(false);
  const [incorrectDropId, setIncorrectDropId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const playSound = (sound: 'start' | 'success' | 'error' | 'win') => {
    if (audioRef.current) {
      const soundMap = {
        start: '/MakestoryGame/MakestoryGameAudio.m4a',
        success: '/sounds/success.mp3',
        error: '/sounds/error.mp3',
        win: '/sounds/win.mp3',
      };
      audioRef.current.src = soundMap[sound];
      audioRef.current.play().catch(e => console.error("Audio error:", e));
    }
  };

  const startNewRound = () => {
    const randomLevel = storyLevels[Math.floor(Math.random() * storyLevels.length)];
    setLevel(randomLevel);
    setSourceItems(shuffleArray(randomLevel.steps));
    setTargetSlots(new Array(randomLevel.steps.length).fill(null));
    setIsGameWon(false);
    playSound('start');
  };

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (targetSlots.length > 0 && targetSlots.every(slot => slot !== null)) {
      setIsGameWon(true);
      playSound('win');
      setTimeout(() => {
        startNewRound();
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSlots]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
  
    if (!over) {
      return;
    }
  
    const activeCard = sourceItems.find(s => s.id === active.id);
    if (!activeCard) {
      return;
    }

    const overId = over.id as string;
    
    if (overId.startsWith('slot-')) {
      const slotIndex = parseInt(overId.replace('slot-', ''), 10);
      
      if (activeCard.order === slotIndex + 1 && !targetSlots[slotIndex]) {
        setTargetSlots(prev => {
          const newSlots = [...prev];
          newSlots[slotIndex] = activeCard;
          return newSlots;
        });
        setSourceItems(prev => prev.filter(item => item.id !== active.id));
        playSound('success');
      } else {
        setIncorrectDropId(active.id as string);
        playSound('error');
        setTimeout(() => setIncorrectDropId(null), 500);
      }
    } else {
      // If not dropped on a slot, indicate error
      setIncorrectDropId(active.id as string);
      playSound('error');
      setTimeout(() => setIncorrectDropId(null), 500);
    }
  };

  const activeCard = activeId ? level.steps.find(s => s.id === activeId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="container mx-auto flex min-h-dvh flex-col px-4 py-8">
        <Confetti active={isGameWon} />
        <audio ref={audioRef} preload="auto" />
        <header className="mb-8 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
          <Button asChild variant="outline">
            <Link href="/games">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к играм
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="font-headline text-2xl font-bold tracking-tight md:text-4xl">Собери историю</h1>
            <p className="flex items-center justify-center text-sm text-muted-foreground md:text-base">
              <Volume2 className="mr-2 h-5 w-5" />
              <span>Расставь картинки по порядку.</span>
            </p>
          </div>
          <Button variant="outline" onClick={startNewRound}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Следующий
          </Button>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-8 py-8 md:gap-16">
          {/* Target Slots */}
          <div className="grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            {targetSlots.map((card, index) => (
              <DroppableSlot key={`slot-${index}`} id={`slot-${index}`} index={index}>
                {card ? <StaticCard card={card} /> : null}
              </DroppableSlot>
            ))}
          </div>

          {/* Source Cards */}
          <div className="grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
            <SortableContext items={sourceItems} strategy={rectSortingStrategy}>
              {sourceItems.map(item => (
                <SortableCard
                  key={item.id}
                  id={item.id}
                  card={item}
                  isIncorrect={incorrectDropId === item.id}
                />
              ))}
            </SortableContext>
          </div>
        </main>
      </div>

      <DragOverlay>
        {activeCard ? <StoryCard card={activeCard} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}

// Components for DND
function DroppableSlot({ id, index, children }: { id: string, index: number, children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({id});

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative flex aspect-video items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/50 bg-muted/40 transition-colors",
        isOver && "border-primary bg-primary/10"
      )}
    >
      <span className="text-4xl font-bold text-muted-foreground/30">{index + 1}</span>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function SortableCard({ id, card, isIncorrect }: { id: string, card: StoryStep, isIncorrect: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StoryCard card={card} className={cn(isIncorrect && "animate-shake")} />
    </div>
  );
}

function StaticCard({ card }: { card: StoryStep }) {
  return (
    <div className="h-full w-full p-1">
      <Card className="h-full w-full overflow-hidden border-2 border-green-500 shadow-lg">
        <CardContent className="relative h-full w-full p-0">
          <Image src={card.img} alt={`Story step ${card.order}`} fill sizes="25vw" className="object-cover" />
        </CardContent>
      </Card>
    </div>
  );
}

function StoryCard({ card, isDragging, className }: { card: StoryStep, isDragging?: boolean, className?: string }) {
  return (
    <Card
      className={cn(
        "relative aspect-video w-full overflow-hidden shadow-md transition-shadow hover:shadow-xl",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
    >
      <CardContent className="relative h-full w-full p-0">
        <Image src={card.img} alt={`Story step ${card.order}`} fill sizes="25vw" className="object-cover" />
        <div className="absolute bottom-1 right-1 flex items-center justify-center rounded-full bg-black/50 p-1 text-white">
          <GripVertical className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
