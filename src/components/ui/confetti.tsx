
'use client';
import React, { useEffect, useState } from 'react';

const ConfettiPiece = ({ id, style }: { id: number; style: React.CSSProperties }) => (
  <div
    key={id}
    className="absolute h-2 w-4 animate-fall"
    style={style}
  />
);

export const Confetti = ({ active, count = 150 }: { active: boolean; count?: number }) => {
  const [pieces, setPieces] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * -20;
        const animDuration = Math.random() * 3 + 4;
        const animDelay = Math.random() * 5;
        const colors = ['#fde047', '#f87171', '#4ade80', '#60a5fa', '#a78bfa', '#fb923c'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return {
          id: i,
          style: {
            left: `${x}vw`,
            top: `${y}vh`,
            backgroundColor: color,
            animationDuration: `${animDuration}s`,
            animationDelay: `${animDelay}s`,
          },
        };
      });
      setPieces(newPieces);
    } else {
      // Allow animations to finish
      const timer = setTimeout(() => setPieces([]), 6000);
      return () => clearTimeout(timer);
    }
  }, [active, count]);

  if (!active && pieces.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 h-full w-full overflow-hidden">
      {pieces.map(p => (
        <ConfettiPiece key={p.id} id={p.id} style={p.style} />
      ))}
    </div>
  );
};
