'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    ym: any;
  }
}

export function AppAdBanner() {
  const handleAdClick = () => {
    if (typeof window.ym === 'function') {
      window.ym(106841467,'reachGoal','buy_app_click');
    }
  };

  return (
    <a
      href="https://apps.apple.com/app/id6751292289"
      target="_blank"
      rel="sponsored nofollow"
      onClick={handleAdClick}
      className="group my-8 block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105">
          <img 
            src="/ArticalsImages/appIcon.png"
            alt="Наталья Уварова" 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-headline text-xl font-bold text-foreground">
            Ваш ребенок заговорит сам — пока вы отдыхаете!
          </h3>
          <p className="text-muted-foreground mt-2">
            А если хотите, чтобы ваш малыш заговорил при минимальных затратах вашего времени, просто скачайте приложение, которое я разработала специально для запуска речи. Весь интерфейс настроен в игровой форме, поэтому ваше участие практически не требуется. Просто дайте ребенку телефон на 15–20 минут: с этим приложением ваш малыш играючи освоит базовые звуки, и его речь запустится сама собой!
          </p>
        </div>
        <div
          className={cn(
            buttonVariants({ size: 'lg' }),
            'mt-4 flex-shrink-0 md:mt-0'
          )}
        >
          Скачать приложение
        </div>
      </div>
    </a>
  );
}
