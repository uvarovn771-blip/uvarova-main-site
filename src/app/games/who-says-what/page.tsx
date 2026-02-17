
import type { Metadata } from 'next';
import WhoSaysWhatGame from '@/components/games/WhoSaysWhat';

export const metadata: Metadata = {
  title: 'Игра «Кто как говорит?»',
  description: 'Онлайн игра для детей от 1 до 4 лет. Учим звуки животных в веселой и интерактивной форме.',
  alternates: {
    canonical: '/games/who-says-what',
  },
};

export default function WhoSaysWhatPage() {
  return <WhoSaysWhatGame />;
}
