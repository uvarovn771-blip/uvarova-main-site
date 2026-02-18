
import type { Metadata } from 'next';
import MakeStoryGame from '@/components/games/MakeStory';

export const metadata: Metadata = {
  title: 'Игра «Собери историю»',
  description: 'Онлайн игра для развития логики и последовательного мышления у детей. Собери картинки в правильном порядке, чтобы получилась история.',
  alternates: {
    canonical: '/games/make-story',
  },
};

export default function MakeStoryPage() {
  return <MakeStoryGame />;
}
