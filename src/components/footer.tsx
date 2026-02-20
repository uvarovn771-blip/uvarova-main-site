
import Link from "next/link";
import { Logo } from "./logo";

export function Footer() {
    return (
      <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
            <Logo />
            <div className="flex flex-col items-center gap-2 text-center md:items-end md:text-right">
              <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} SpeechAce. Все права защищены.
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-end">
                <Link href="/privacy" className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                    Политика конфиденциальности
                </Link>
                <a href="mailto:uvarovn771@gmail.com" className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                    Связаться с нами
                </a>
              </div>
            </div>
        </div>
      </footer>
    );
}
