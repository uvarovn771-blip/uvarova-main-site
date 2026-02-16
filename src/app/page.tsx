
import type { Metadata } from 'next';

import { articles } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HomeClient from './home-client';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

  return (
    <HomeClient articles={articles} heroImage={heroImage} />
  );
}
