import { Logo } from "./logo";

export function Footer() {
    return (
      <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
            <Logo />
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SpeechAce. Все права защищены.
            </p>
        </div>
      </footer>
    );
}
