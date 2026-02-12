import { Rocket } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AdBanner() {
  return (
    <a
      href="https://uvarovn771-blip.github.io/studio/"
      target="_blank"
      rel="sponsored nofollow"
      className="group my-8 block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 transition-transform duration-300 group-hover:scale-110">
          <Rocket className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-headline text-xl font-bold text-foreground">
            Научите ребенка говорить за 18 занятий
          </h3>
          <p className="text-muted-foreground">
            По авторской методике Натальи Уваровой (30+ лет стажа).
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
