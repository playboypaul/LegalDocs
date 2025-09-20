import { Scale } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Scale className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">Legal Draft AI</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {/* Add more nav links here if needed */}
        </nav>
        <div className="flex items-center justify-end">
          <Button asChild variant="ghost">
            <Link href="#pricing">Pricing</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
