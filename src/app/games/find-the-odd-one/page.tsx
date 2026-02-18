
import type { Metadata } from 'next';
import FindTheOddOneGame from '@/components/games/FindTheOddOne';

export const metadata: Metadata = {
  title: 'Игра «Найди лишнее»',
  description: 'Онлайн игра для развития логики и внимания у детей. Найди предмет, который не подходит к остальным.',
  alternates: {
    canonical: '/games/find-the-odd-one',
  },
};

export default function FindTheOddOnePage() {
  return <FindTheOddOneGame />;
}
