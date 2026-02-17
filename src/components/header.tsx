'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

type NavLinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/games', label: 'Игры' },
  {
    href: 'https://uvarovn771-blip.github.io/studio/',
    label: 'Курс',
    external: true,
  },
  {
    href: 'https://apps.apple.com/app/id6751292289',
    label: 'Приложение',
    external: true,
  },
  { href: '/about', label: 'Об авторе' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, external }: NavLinkItem) => {
    const isActive =
      !external && (href === '/' ? pathname === href : pathname.startsWith(href));
    const className = cn(
      'text-sm font-medium transition-colors hover:text-primary',
      isActive ? 'text-primary' : 'text-muted-foreground'
    );

    if (external) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }

    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  };

  const MobileNavLink = ({ href, label, external }: NavLinkItem) => {
    const className = "text-muted-foreground transition-colors hover:text-primary";
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Переключить меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link
                href="/"
                className="mb-8 flex items-center"
                aria-label="Главная"
              >
                <Logo />
              </Link>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <MobileNavLink key={link.href} {...link} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
