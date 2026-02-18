
import type { Metadata } from 'next';
import MemoryMatchGame from '@/components/games/MemoryMatch';

export const metadata: Metadata = {
  title: 'Игра «Найди пару»',
  description: 'Развивающая игра на память для детей. Найди одинаковые картинки и открой все пары.',
  alternates: {
    canonical: '/games/memory-match',
  },
};

export default function MemoryMatchPage() {
  return <MemoryMatchGame />;
}
