'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AdBanner() {
  const handleAdClick = () => {
    if (typeof window.ym === 'function') {
      window.ym(106841467, 'reachGoal', 'buy_curse_click');
    }
  };

  return (
    <a
      href="https://uvarovn771-blip.github.io/studio/"
      target="_blank"
      rel="sponsored nofollow"
      onClick={handleAdClick}
      className="group my-8 block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted/50 transition-transform duration-300 group-hover:scale-105">
          <img 
            src="/ArticalsImages/aboutUs.jpeg"
            alt="Наталья Уварова" 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-headline text-xl font-bold text-foreground">
            Научите ребенка говорить за 18 занятий!
          </h3>
          <p className="text-muted-foreground mt-2">
            По моей авторской методике! Я, Наталья Уварова — логопед-дефектолог с 30+ летним стажем — разработала уникальную программу, способную запустить речь вашего малыша (1–4 года) всего за 18 коротких занятий в домашних условиях.
          </p>
        </div>
        <div
          className={cn(
            buttonVariants({ size: 'lg' }),
            'mt-4 flex-shrink-0 md:mt-0'
          )}
        >
          Узнать подробнее
        </div>
      </div>
    </a>
  );
}