import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function AdBanner() {
  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg">
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Rocket className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-headline text-xl font-bold text-foreground">
            Научите ребенка говорить за 18 занятий
          </h3>
          <p className="text-muted-foreground">
            По авторской методике Натальи Уваровой (30 лет опыта).
          </p>
        </div>
        <Button asChild size="lg" className="mt-4 flex-shrink-0 md:mt-0">
          <a
            href="https://uvarovn771-blip.github.io/studio/"
            target="_blank"
            rel="sponsored nofollow"
          >
            Узнать подробнее
          </a>
        </Button>
      </div>
    </div>
  );
}
